<template>
  <ui-spoiler class="spoiler">
    <template #header="{ toggle, state }">
      <div class="flex items-center gap-1 text-sm pl-1.5">
        <ui-icon name="ExclamationMark" class="shrink-0" active></ui-icon>
        <button type="button" class="lg:text-sm text-2xs/[14px]" @click="toggle">
          Внимание, при нажатии раскрывается информация про страны
          <ui-icon
            name="ArrowTick"
            :class="['tick w-3.5 spoiler__arrow', 'ml-1', { 'tick--active': state }]"
          ></ui-icon>
        </button>
      </div>
    </template>

    <p class="text-2xs mt-2.5" v-html="info"></p>
  </ui-spoiler>
</template>

<script setup lang="ts">
type Props = {
  info?: string
}

withDefaults(defineProps<Props>(), {
  info: 'Выберите способ оплаты, чтобы узнать детали'
})
</script>

<style lang="scss" scoped>
.spoiler {
  position: relative;
  &__arrow {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
