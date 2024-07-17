<template>
  <div class="ui-spoiler" :class="{ 'ui-spoiler--open': isOpen }">
    <div class="ui-spoiler__header">
      <slot name="header" :toggle="toggle" :state="isOpen" :collapse="collapse" :expand="expand" />
    </div>
    <transition
      name="ui-spoiler__content"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div
        v-show="isOpen"
        ref="content"
        :class="[
          'ui-spoiler__content',
          {
            'ui-spoiler__content--hidden': !isOpen
          }
        ]"
      >
        <slot :state="isOpen" :final-state="isFullyOpened" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, watch } from 'vue'

const props = defineProps({
  onStartOpen: {
    type: Boolean
  },
  outerStateFlag: {
    type: Boolean
  }
})

const { onStartOpen } = toRefs(props)
const isOpen = ref(false)
const isFullyOpened = ref(false)
const content = ref<HTMLElement | null>(null)
const isTouched = ref(false)

watch(
  () => props.outerStateFlag,
  () => {
    isOpen.value = props.outerStateFlag
  }
)

onMounted(() => {
  isOpen.value = onStartOpen.value
  if (props.outerStateFlag) {
    isOpen.value = props.outerStateFlag
  }
  isFullyOpened.value = isOpen.value
})

const onBeforeEnter = () => {
  if (!isTouched.value && onStartOpen.value) {
    isTouched.value = true
    return
  }
  content.value && content.value.style.setProperty('max-height', '0px')
}

const onEnter = () => {
  content.value && content.value.style.setProperty('max-height', content.value!.scrollHeight + 'px')
}

const onAfterEnter = async () => {
  content.value && content.value.style.removeProperty('max-height')
  isFullyOpened.value = isOpen.value
}

const onBeforeLeave = () => {
  content.value && content.value.style.setProperty('max-height', content.value!.scrollHeight + 'px')
}

const onLeave = async () => {
  content.value && content.value.style.setProperty('max-height', '0px')
  isFullyOpened.value = isOpen.value
}

const toggle = () => {
  isOpen.value = !isOpen.value
  return isOpen.value
}

const collapse = () => {
  isOpen.value = false
}

const expand = () => {
  isOpen.value = true
}
</script>

<style lang="scss" scoped>
.ui-spoiler {
  &__content {
    transition: max-height 0.3s;
    height: 100%;

    &-enter-active,
    &-leave-active {
      overflow: hidden;
    }
  }
}
</style>
