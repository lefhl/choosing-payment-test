<template>
  <ui-input
    ref="component"
    v-model="localValue"
    @blur="isBlurred = true"
    @focus="isBlurred = false"
  ></ui-input>
</template>

<script setup lang="ts">
import { prettifySum } from '@/utils/currencies'
import { computed, ref } from 'vue'

type Props = {
  modelValue: string | number
  additionalSign?: string
}

const props = defineProps<Props>()

type Emits = {
  (e: 'update:modelValue', v: string): void
}
const emit = defineEmits<Emits>()

const component = ref()
const isBlurred = ref(false)

const formatValue = (v: string) => {
  if (!v) return ''

  return prettifySum(v) + (isBlurred.value ? props.additionalSign : '')
}

const clearData = (v: string) => {
  let cleanedInput = (v ?? '').replace(/[^0-9,]/g, '')
  const lastCommaIndex = cleanedInput.lastIndexOf(',')

  if (lastCommaIndex !== -1) {
    cleanedInput =
      cleanedInput.slice(0, lastCommaIndex).replace(/,/g, '.') + cleanedInput.slice(lastCommaIndex)
  }

  return cleanedInput
}

const localValue = computed({
  get: () => formatValue(props.modelValue as string),
  set: (v) => {
    emit('update:modelValue', clearData(v))
    component.value.input.value = formatValue(props.modelValue as string)
  }
})
</script>

<style scoped></style>
