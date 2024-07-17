<template>
  <div class="tooltip">
    <ui-icon class="tooltip__icon cursor-pointer" :name="iconName"></ui-icon>
    <section class="tooltip__body py-2 px-3 font-medium text-sm">
      <slot>{{ text }}</slot>
    </section>
  </div>
</template>

<script setup lang="ts">
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
    border-radius: 10px;
    min-width: 247px;
    visibility: hidden;
    box-shadow: 0 0 8px rgba(#000000, 8%);
  }
}
</style>
