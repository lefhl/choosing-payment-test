<template>
  <article class="mt-10 pb-20">
    <h1>
      Пополните баланс,
      <span class="secondary-text font-medium">чтобы получить номер для приема смс</span>
    </h1>

    <div class="subtitle flex items-center mb-4">
      <h3>Выберите валюту оплаты</h3>
      <ui-tooltip text="Тут выбирается способ которым вы будете оплачивать"></ui-tooltip>
    </div>

    <section class="currencies flex gap-4">
      <ui-tile
        :active="selectedCurrencyType === 'crypto'"
        style="min-width: 179px"
        @click="setCryptoWay"
      >
        <ui-badge class="absolute z-1 badge">Рекомендуем</ui-badge>
        <img src="/btc.png" alt="Биткоин" />
        Криптовалюты</ui-tile
      >
      <currency-picker
        v-model="selectedCurrency"
        :active="selectedCurrencyType === 'state'"
        :options="currencies"
        @update:model-value="setSelectedConventionalCurrency"
        @activate="selectedCurrencyType = 'state'"
      ></currency-picker>
    </section>
    <h3>Выберите способ оплаты</h3>
    <section class="payment-ways pretty-scrollbar">
      <ui-tile
        v-for="item in options"
        :key="item.name"
        :active="selectedPaymentWay === item.name"
        @click="setWayToPay(item.name)"
      >
        <img :src="`/payment-options/${item.icon}.png`" :alt="item.name" />
        <div>
          <h4>{{ item.name }}</h4>
          <div class="text-left">
            <span class="secondary-text small-text">Комиссия: </span
            ><span class="small-text">{{ item.comission }}</span>
          </div>
        </div>
      </ui-tile>
    </section>
    <ui-spoiler class="mt-4">
      <template #header="{ toggle, state }">
        <div class="flex items-center gap-1 text-sm">
          <ui-icon name="ExclamationMark" active></ui-icon>
          <button type="button" @click="toggle">
            Внимание, при нажатии раскрывается информация про страны
            <ui-icon
              name="ArrowTick"
              :class="['tick', 'ml-1', { 'tick--active': state }]"
            ></ui-icon>
          </button>
        </div>
      </template>

      <p class="text-xs mb-2.5 mt-2.5">Зачисление до 6 минут</p>
      <p class="text-xs mb-0.5">Эта платежная система не принимает платежи из стран:</p>
      <p class="text-xs">
        Армения, Австрия, Азербайджан, Бельгия, Болгария, Кипр, Чешская Республика, Дания, Эстония,
        Финляндия, Франция, Грузия, Германия, Греция, Венгрия, Исландия, Ирландия, Испания, Италия,
        Кыргызстан, Латвия, Литва, Люксембург, Мальта, Румыния, Сербия и Черногория, Словакия,
        Словения, Швеция, Швейцария, Таджикистан, Турция, Туркменистан, Соединенное Королевство,
        Узбекистан, Австралия, Норвегия, Израиль, Португалия, Нидерланды, Саудовская Аравия,
        Объединенные Арабские Эмираты, Сингапур, Новая Зеландия, Хорватия, Польша,
        Бруней-Даруссалам, Перу, Южная Корея, Катар, Египет.
      </p>
    </ui-spoiler>
    <section class="payment-sum mb-4">
      <h3 class="mb-4">Укажите сумму платежа</h3>
      <ui-input-number
        v-model="selectedSum"
        additionalSign="₽"
        :error="validationError"
        placeholder="Минимальная сумма платежа: 1.000₽"
      ></ui-input-number>

      <div class="flex gap-2.5 mt-2.5">
        <ui-chip v-for="sum in predefinedSums" :key="sum" @click="selectedSum = sum"
          >{{ sum }}₽</ui-chip
        >
      </div>
    </section>
    <ui-button :disabled="isRequestLoading" @click="sendPaymentRequest">Оплатить</ui-button>
    <a v-if="linkToGo" :href="linkToGo">{{ linkToGo }}</a>
    <span v-else-if="errorMessage">{{ errorMessage }}</span>
  </article>
</template>

<script setup lang="ts">
import CurrencyPicker from '@/components/CurrencyPicker.vue'
import { computed, onMounted, ref } from 'vue'
import {
  getAllCurrencies,
  getAllWaysToPay,
  sendPaymentRequestToServer,
  type CurrencyInfo,
  type PayWayInfo
} from './utils'

const selectedCurrencyType = ref<'crypto' | 'state'>('state')
const selectedCurrency = ref('RUB')
const selectedPaymentWay = ref<string>()

const cryptoWaysToPay = ref<PayWayInfo[]>([])

const conventionalWaysToPay = ref<PayWayInfo[]>([])

const options = computed(() =>
  selectedCurrencyType.value === 'crypto' ? cryptoWaysToPay.value : conventionalWaysToPay.value
)

const currencies = ref<CurrencyInfo[]>([])

const loadWaysToPay = async (currency: string) => {
  try {
    const { state, crypto } = await getAllWaysToPay(currency)
    cryptoWaysToPay.value = crypto
    conventionalWaysToPay.value = state
  } catch (error) {
    console.error('Не успех :(')
  }
}

const loadAllCurrencies = async () => {
  try {
    const data = await getAllCurrencies()
    currencies.value = data
  } catch (error) {
    console.error('Не успех :(')
  }
}

/**
 * Имитация запроса на сервак
 */
onMounted(async () => {
  Promise.all([loadAllCurrencies(), loadWaysToPay('RUB')])
})

const setCryptoWay = () => {
  selectedCurrencyType.value = 'crypto'
}

const setSelectedConventionalCurrency = (v: string) => {
  selectedCurrency.value = v
  selectedCurrencyType.value = 'state'
}

const setWayToPay = (v: string) => {
  selectedPaymentWay.value = v
}

const predefinedSums = [1000, 2000, 5000, 10000, 20000, 50000]

const selectedSum = ref<number>()

const validationError = computed(() => {
  if (!selectedSum.value) return ''

  if (Number(selectedSum.value) < 1000) return 'Внимание, минимальная сумма 1.000₽ '

  return ''
})

const isRequestLoading = ref(false)
const errorMessage = ref('')
const linkToGo = ref('')

const sendPaymentRequest = async () => {
  isRequestLoading.value = true
  linkToGo.value = ''
  errorMessage.value = ''
  try {
    linkToGo.value = await sendPaymentRequestToServer({
      currency: selectedCurrency.value,
      method: selectedCurrencyType.value,
      sum: Number(selectedSum.value)
    })
  } catch (error) {
    errorMessage.value = error as string
  }
  isRequestLoading.value = false
}
</script>

<style lang="scss" scoped>
.subtitle {
  gap: 9px;
  margin-top: 30px;
}

.currencies {
  margin-block: 30px 5px;
}

.payment-ways {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 16px;
  padding-top: 10px;
  padding-right: 4px;
  margin-top: 5px;
  max-height: 214px;
  overflow-y: auto;
}

.badge {
  top: 5px;
  right: 9px;
}

.payment-sum {
  margin-top: 30px;
}
</style>
