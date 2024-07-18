<template>
  <ui-tile size="small" :active="active">
    <img class="w-6 h-6 rounded-full" :src="flagSrc" alt="Флаг" />
    <span class="font-bold text-2xs uppercase">{{ mnemo }}</span>
  </ui-tile>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { getFlagImageSrcByMnemo } from '../utils'

type Props = {
  mnemo: 'USD' | 'RUB'
  active?: boolean
}

const props = defineProps<Props>()

const flagSrc = computed(() => getFlagImageSrcByMnemo(props.mnemo))
</script>
