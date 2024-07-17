import type { App } from 'vue'

import UiContainer from './UI/UiContainer.vue'
import UiTooltip from './UI/UiTooltip.vue'
import UiIcon from './UI/UiIcon/UiIcon.vue'
import UiTile from './UI/UiTile.vue'
import UiBadge from './UI/UiBadge.vue'
import UiSpoiler from './UI/UiSpoiler.vue'
import UiInput from './UI/UiInput.vue'
import UiInputNumber from './UI/UiInputNumber.vue'
import UiChip from './UI/UiChip.vue'
import UiButton from './UI/UiButton.vue'

export function registerGlobalComponents(app: App): void {
  app.component('UiContainer', UiContainer)
  app.component('UiTooltip', UiTooltip)
  app.component('UiIcon', UiIcon)
  app.component('UiTile', UiTile)
  app.component('UiBadge', UiBadge)
  app.component('UiSpoiler', UiSpoiler)
  app.component('UiInput', UiInput)
  app.component('UiChip', UiChip)
  app.component('UiInputNumber', UiInputNumber)
  app.component('UiButton', UiButton)
}
