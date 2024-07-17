<template>
  <component :is="loadedComponent" :class="['inline-block', { active: active }]"></component>
</template>

<script setup lang="ts">
import type { IconName } from './types'
import { watch, ref } from 'vue'

type Props = {
  size?: '15' // Предполагаются другие размеры в будущем
  name: IconName
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: '15'
})

const loadedComponent = ref<unknown>(null)

const loadComponent = async (name: IconName) => {
  try {
    const component = await import(`./icons/${name}.vue`)
    loadedComponent.value = component.default
  } catch (error) {
    console.error(`Error loading component ${name}:`, error)
    loadedComponent.value = null
  }
}

watch(
  () => props.name,
  (newName) => {
    loadComponent(newName)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.active {
  &:deep(path) {
    fill: #292d32;
  }
}
</style>
