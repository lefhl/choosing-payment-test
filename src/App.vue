<template>
  <header class="header">
    <section class="header__top"></section>
    <section class="header__bottom"></section>
  </header>
  <main class="main">
    <ui-container>
      <RouterView />
    </ui-container>
  </main>
  <footer class="footer"></footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  &__top {
    height: var(--header-top-size);
    background: linear-gradient(90deg, #282828 0%, #3a3a41 99%);
  }
  &__bottom {
    height: var(--header-bottom-size);
    background: linear-gradient(90deg, #333333 0%, #4d4d4d 99%);
  }
}

.main {
  padding-top: calc(var(--header-top-size) + var(--header-bottom-size));
}

.footer {
  height: 500px;
  background-color: #000;
}
</style>
