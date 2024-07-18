<template>
  <button class="button leading-none" type="button"><slot></slot></button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.button {
  width: 100%;
  padding: 20px;
  color: #fff;
  background: linear-gradient(45deg, #c5a67c 6%, #e2c299 94%);
  background-blend-mode: soft-light;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  height: 63px;
  &:hover {
    background: linear-gradient(45deg, #fff 0%, #fff 100%),
      linear-gradient(45deg, #c5a67c 6%, #e2c299 94%);
  }
}
</style>
