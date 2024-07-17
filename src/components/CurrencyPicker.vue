<template>
  <div class="picker">
    <ui-tile class="picker__tile mb-3" :active="active">
      <div class="picker__selected flex items-center h-full gap-2 pr-4" @click="emit('activate')">
        <img class="w-6 h-6 radius-full" :src="selectedCurrencyImage" alt="Флаг" />
        <span class="font-bold text-xs">{{ modelValue }}</span>
      </div>
      <button
        class="picker__btn flex items-center grow justify-center h-full gap-2 font-medium"
        type="button"
        @click.stop="isOptionsVisible = !isOptionsVisible"
      >
        <img class="w-6 h-6 radius-full" src="../assets/images/exchange.png" />
        Другие валюты
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
        :key="option.mnemo"
        :active="modelValue === option.mnemo"
        :mnemo="option.mnemo"
        :flag="`/flags/${option.flag}.png`"
        @click="selectNewCurrency(option.mnemo)"
      ></flag-option>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import FlagOption from './FlagOption.vue'
import type { CurrencyInfo } from '@/views/utils'
/**
 * Потенциально можно вынести в UI-компонент, но, чтобы это понять, необходимы другие кейсы использования
 * Пока что выглядит как специфическая история
 */

type Props = {
  modelValue: string
  active?: boolean
  options?: CurrencyInfo[]
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
  return `/flags/${props.options.find((item) => item.mnemo === props.modelValue)?.flag ?? ''}.png`
})

const selectNewCurrency = (v: string) => {
  emit('update:modelValue', v)
}
</script>

<style lang="scss" scoped>
.picker {
  &__tile {
    max-width: 317px;
  }

  &__trigger {
    box-shadow: 0 0 15px rgba(#000000, 6%);
    height: 68px;
    max-width: 275px;
    border-radius: 10px;
    gap: 10px;
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
