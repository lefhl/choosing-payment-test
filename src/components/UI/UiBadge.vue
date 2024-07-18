<template>
  <div class="badge h-4 rounded-full py-0.5 lg:px-1.5 px-1 text-2xl"><slot></slot></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.badge {
  color: #fff;
  background: linear-gradient(90deg, #c5a67c 6%, #e2c299 94%);
  font-size: 10px;
  line-height: 12px;

  @media (max-width: 768px) {
    font-size: 9px;
  }
}
</style>
