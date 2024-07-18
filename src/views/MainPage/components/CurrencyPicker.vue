<template>
  <div class="picker">
    <ui-tile class="picker__tile flex lg:gap-5 gap-4 mb-3" :active="active">
      <div
        class="picker__selected flex items-center h-full gap-3 pr-3 lg:pr-5"
        @click="emit('activate')"
      >
        <img class="w-7 h-7 radius-full" :src="selectedCurrencyImage" alt="Флаг" />
        <span class="font-bold text-sm lg:text-base">{{ modelValue }}</span>
      </div>

      <button
        class="picker__btn flex items-center grow justify-center h-full lg:gap-2.5 gap-2 pl-1 font-medium"
        type="button"
        @click.stop="isOptionsVisible = !isOptionsVisible"
      >
        <img class="w-6 h-6 radius-full" src="../../../assets/images/exchange.png" />
        <span class="lg:text-sm text-3xs font-medium"> Другие валюты</span>
        <ui-icon
          :class="{ 'tick--active': isOptionsVisible }"
          class="tick cursor-pointer"
          name="ArrowTick"
        ></ui-icon>
      </button>
    </ui-tile>

    <aside v-show="isOptionsVisible" :aria-hidden="isOptionsVisible" class="picker__options">
      <flag-option
        v-for="option in options"
        :key="option"
        :active="modelValue === option"
        :mnemo="option"
        :flag="`/flags/${option}.png`"
        @click="selectNewCurrency(option)"
      ></flag-option>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import FlagOption from './FlagOption.vue'
import { getFlagImageSrcByMnemo, type Mnemo } from '@/views/MainPage/utils'
/**
 * Потенциально можно вынести в UI-компонент, но, чтобы это понять, необходимы другие кейсы использования
 * Пока что выглядит как специфическая история
 */

type Props = {
  modelValue: Mnemo
  active?: boolean
  options?: Mnemo[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => []
})

type Emits = {
  (e: 'update:modelValue', v: string): void
  (e: 'activate'): void
}
const emit = defineEmits<Emits>()

const isOptionsVisible = ref(false)

const selectedCurrencyImage = computed(() => {
  return getFlagImageSrcByMnemo(props.modelValue)
})

const selectNewCurrency = (v: string) => {
  emit('update:modelValue', v)
}
</script>

<style lang="scss" scoped>
.picker {
  &__tile {
    max-width: 317px;
    width: 100%;
  }
  &__selected {
    border-right: 1px solid rgba(#000000, 10%);
  }

  &__options {
    max-width: 292px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }

  &__btn {
    font-size: 13px;
  }
}
</style>
