<template>
  <component :is="tag" :class="['tile flex items-center gap-2 px-3 py-1', classes]" type="button">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  active?: boolean
  tag?: keyof HTMLElementTagNameMap
  size?: 'normal' | 'small'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  tag: 'button',
  hoverable: true
})

const classes = computed(() => {
  return {
    'tile--active': props.active,
    'tile--small': props.size === 'small',
    'tile--hoverable': props.hoverable
  }
})
</script>

<style lang="scss" scoped>
.tile {
  height: 68px;
  position: relative;
  user-select: none;
  box-shadow: 0 0 15px rgba(#000000, 6%);
  min-width: max-content;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #c5a67c 0%, #e2c299 94%);
    border-radius: 10px;
    z-index: -1;
    padding: 3px;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &--hoverable {
    &:hover:not(&--active) {
      &::before {
        opacity: 0.5;
      }
    }
  }

  &--small {
    height: 44px;
    padding: 14px;
    border-radius: 10px;
  }

  &--active {
    &::before {
      opacity: 1;
    }
  }
}
</style>
