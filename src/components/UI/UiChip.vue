<template>
  <button type="button" class="chip flex items-center rounded-xl h-8 py-2 px-3 text-sm">
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.chip {
  background-color: rgba(#212529, 0.04);
  color: rgba(#212529, 0.6);
}
</style>
