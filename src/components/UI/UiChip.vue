<template>
  <button type="button" class="chip py-2 px-3 text-sm"><slot></slot></button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.chip {
  background-color: rgba(#212529, 0.04);
  color: rgba(#212529, 0.6);
  border-radius: 10px;
}
</style>
