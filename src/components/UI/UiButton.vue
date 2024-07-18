<template>
  <button
    class="button leading-none text-xl lg:text-2xl rounded-large font-medium p-3.5 lg:p-5 w-full text-center"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.button {
  color: #fff;
  background: linear-gradient(45deg, #c5a67c 6%, #e2c299 94%);
  background-blend-mode: soft-light;
  height: 63px;
  &:hover {
    background: linear-gradient(45deg, #fff 0%, #fff 100%),
      linear-gradient(45deg, #c5a67c 6%, #e2c299 94%);
  }

  @media (max-width: 768px) {
    height: 49px;
  }
}
</style>
