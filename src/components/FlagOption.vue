<template>
  <ui-tile size="small" :active="active">
    <img class="w-6 h-6 rounded-full" :src="flag" alt="Флаг" />
    <span class="font-bold text-xs uppercase">{{ mnemo }}</span>
  </ui-tile>
</template>

<script lang="ts" setup>
type Props = {
  flag: string
  mnemo: string
  active?: boolean
}

defineProps<Props>()
</script>
