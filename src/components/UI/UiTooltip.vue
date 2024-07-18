<template>
  <div class="tooltip">
    <ui-icon class="tooltip__icon cursor-pointer" :name="iconName"></ui-icon>
    <section class="tooltip__body rounded-xl py-2 px-3 font-medium text-sm">
      <slot>{{ text }}</slot>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Упрощенная версия тултипа. В идеале прикрутить popper.js или что-то самописное,
 * для определения его позиции относительно окна браузера (чтобы не залазил за край),
 * здесь позиционирование по центру
 */
type Props = {
  text?: string
  iconName?: string
}

withDefaults(defineProps<Props>(), {
  iconName: 'QuestionMark'
})
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  &__icon {
    &:hover {
      &:deep(path) {
        fill: #292d32;
      }
      & + .tooltip__body {
        visibility: visible;
      }
    }
  }
  &__body {
    position: absolute;
    background-color: #fff;
    min-width: 247px;
    visibility: hidden;
    box-shadow: 0 0 8px rgba(#000000, 8%);
    z-index: 100;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>
