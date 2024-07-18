<template>
  <div class="input relative">
    <input
      ref="input"
      type="text"
      v-bind="$attrs"
      class="input__field rounded-xl py-4 px-5 text-sm lg:text-base"
      :value="modelValue"
      :model-value="modelValue"
      :invalid="Boolean(error)"
      @input.prevent="setNewValue"
    />
    <ui-icon v-show="modelValue" class="input__cleaner" name="RemoveCross" @click="clear"></ui-icon>
  </div>
  <span class="input__error text-2xs">{{ error }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  modelValue: string
  type?: string
  error?: string
}
withDefaults(defineProps<Props>(), {
  type: 'text'
})

type Emits = {
  (e: 'update:modelValue', v: string): void
}
const emit = defineEmits<Emits>()

const input = ref<HTMLInputElement>()

const setNewValue = (e: InputEvent) => {
  emit('update:modelValue', e.target?.value as string)
}

const clear = () => emit('update:modelValue', '')

defineExpose({
  input
})
</script>

<style lang="scss" scoped>
.input {
  &__field {
    position: relative;
    height: 51px;
    border: 1px solid rgba(#000000, 0.3);
    outline: none;
    width: 100%;

    &::placeholder {
      color: rgba(#212529, 0.6);
    }

    &:invalid {
      border-color: #e86068;
    }

    @media (max-width: 768px) {
      height: 48px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #c5a67c 0%, #e2c299 94%);
    border-radius: 10px;
    z-index: 1;
    padding: 2px;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }

  &:focus-within {
    &::before {
      opacity: 1;
    }
  }

  &__cleaner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
  }

  &__error {
    color: #e86068;
  }
}
</style>
