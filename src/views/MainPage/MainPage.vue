<template>
  <article class="lg:mt-10 mt-7 pb-20">
    <h1 class="text-xl lg:text-5xl">
      Пополните баланс,
      <span class="secondary-text font-medium">чтобы получить номер для приема смс</span>
    </h1>

    <div class="subtitle flex items-center mb-1 lg:mb-2.5 lg:mb-4 mt-2.5 lg:mt-30px">
      <h3 class="text-sm lg:text-2xl">Выберите валюту оплаты</h3>
      <ui-tooltip text="Тут выбирается способ которым вы будете оплачивать"></ui-tooltip>
    </div>

    <section class="mb-2 lg:mb-4 flex flex-wrap lg:gap-4 gap-2.5">
      <ui-tile
        :active="selectedCurrencyType === 'crypto'"
        class="crypto-tile"
        @click="setCryptoWay"
      >
        <ui-badge class="absolute z-1 crypto-tile__badge">Рекомендуем</ui-badge>
        <img src="/btc.png" alt="Биткоин" />
        <span class="lg:text-sm font-medium text-3xs">Криптовалюты</span></ui-tile
      >
      <currency-picker
        v-model="selectedCurrency"
        :active="selectedCurrencyType === 'state'"
        :options="conventionalWaysToPay"
        @update:model-value="setSelectedConventionalCurrency"
        @activate="selectedCurrencyType = 'state'"
      ></currency-picker>
    </section>

    <h3 class="text-sm lg:text-2xl">Выберите способ оплаты</h3>
    <section class="payment-ways lg:pt-2.5 pretty-scrollbar">
      <ui-tile
        v-for="item in selectedCurrencyPaymentOptions"
        :key="item.title"
        :active="selectedPaymentWay === item.title"
        class="gap-2 lg:gap-3 w-max"
        @click="setWayToPay(item.title)"
      >
        <div
          class="max-w-9 max-h-8 h-full flex justify-center shrink-0 items-center lg:max-h-auto lg:max-w-12 text-center w-full"
        >
          <img
            :src="getPaymentProviderLogoSrc(item.title)"
            class="inline-block object-contain h-full"
            :alt="item.title"
          />
        </div>
        <div>
          <h4 class="text-3xs lg:text-base mb-1 lg:mb-0.5">{{ item.title }}</h4>
          <span class="h-fit block whitespace-nowrap leading-none text-xs lg:text-3xs">
            <span class="secondary-text">Комиссия: </span
            ><span class="font-medium">{{ item.commission }}</span>
          </span>
        </div>
      </ui-tile>
    </section>

    <countries-restriction-spoiler
      v-show="actualPaymentProvider?.description"
      class="spoiler"
      :info="actualPaymentProvider?.description"
    />

    <section class="lg:mb-7 mb-5 mt-5 lg:mt-8">
      <h3 class="lg:mb-4 text-sm mb-2.5 lg:text-2xl">Укажите сумму платежа</h3>
      <ui-input-number
        v-model="selectedSum"
        :additional-sign="currencySign"
        :error="validationError"
        :placeholder="inputPlaceholder"
      ></ui-input-number>

      <div class="flex gap-2.5 mt-2.5 -mx-15px px-15px overflow-y-auto">
        <ui-chip v-for="sum in predefinedSums" :key="sum" @click="selectedSum = sum"
          ><span class="font-medium">{{ prettifySum(sum) }}{{ currencySign }}</span></ui-chip
        >
      </div>
    </section>
    <ui-button :disabled="isRequestLoading" @click="sendPaymentRequest">Оплатить</ui-button>
    <a v-if="linkToGo" :href="linkToGo">{{ linkToGo }}</a>
    <span v-else-if="errorMessage">{{ errorMessage }}</span>
  </article>
</template>

<script setup lang="ts">
import CurrencyPicker from '@/views/MainPage/components/CurrencyPicker.vue'
import { computed, onMounted, ref } from 'vue'
import {
  getCurrencies,
  getPaymentProviderLogoSrc,
  mnemoToSignMap,
  sendPaymentRequestToServer,
  type PaymentTypeInfo
} from './utils'
import CountriesRestrictionSpoiler from './components/CountriesRestrictionSpoiler.vue'
import { prettifySum } from '@/utils/currencies'
import { useRouter } from 'vue-router'

const selectedCurrencyType = ref<'crypto' | 'state'>('state')
const selectedCurrency = ref<string>()
const selectedCryptoCurrency = ref<string>()
const selectedPaymentWay = ref<string>()

const cryptoWaysToPay = ref<string[]>([])
const conventionalWaysToPay = ref<string[]>([])

const currenciesPaymentTypesMap = ref<Record<string, PaymentTypeInfo[]>>({})

const actualCurrency = computed(() => {
  if (selectedCurrencyType.value === 'crypto') {
    return selectedCryptoCurrency.value as string
  }
  return selectedCurrency.value as string
})

const selectedCurrencyPaymentOptions = computed(() => {
  return currenciesPaymentTypesMap.value[actualCurrency.value] ?? []
})

const loadAllCurrencies = async () => {
  const currenciesResponse = await getCurrencies()
  if (!currenciesResponse?.data) {
    // Допустим, она есть
    return router.push('/404')
  }

  selectedCurrency.value = currenciesResponse.data.default_currency

  const cryptoTypes: string[] = []
  const stateTypes: string[] = []

  currenciesPaymentTypesMap.value = currenciesResponse.data.currencies

  for (const key of Object.keys(currenciesResponse.data.currencies)) {
    // По-хорошему бы разделить респонс на обычные валюты и криптовалюты,
    // чтобы не гадать, как здесь
    if (key.toLowerCase().includes('crypto')) {
      cryptoTypes.push(key)
    } else {
      stateTypes.push(key)
    }
  }

  cryptoWaysToPay.value = cryptoTypes
  conventionalWaysToPay.value = stateTypes
}

const router = useRouter()

/**
 * Имитация запроса на сервак
 */
onMounted(loadAllCurrencies)

const setCryptoWay = () => {
  selectedCurrencyType.value = 'crypto'
  selectedCryptoCurrency.value = cryptoWaysToPay.value[0]
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

const actualPaymentProvider = computed(() => {
  return selectedCurrencyPaymentOptions.value.find(
    (item) => item.title === selectedPaymentWay.value
  )
})

const minPaymentSum = computed(() => {
  if (actualPaymentProvider.value) return actualPaymentProvider.value.min_amount

  return 0
})

const currencySign = computed(() => {
  if (selectedCurrencyType.value === 'crypto') return mnemoToSignMap.crypto

  // @ts-expect-error
  return mnemoToSignMap[selectedCurrency.value]
})

const inputPlaceholder = computed(() => {
  if (minPaymentSum.value)
    return `Минимальная сумма платежа: ${minPaymentSum.value}${currencySign.value}`
  return 'Введите сумму платежа'
})

const validationError = computed(() => {
  if (!selectedSum.value) return ''

  if (Number(selectedSum.value) < minPaymentSum.value)
    return `Внимание, минимальная сумма ${minPaymentSum.value}${currencySign.value}`

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
      currency: actualCurrency.value,
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
}

.payment-ways {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(179px, 1fr));
  gap: 16px;
  margin-top: 5px;
  max-height: 214px;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-top: 8px;
    grid-template-columns: repeat(auto-fit, minmax(141px, 1fr));
    gap: 8px;
  }
}

.spoiler {
  margin-top: 18px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
}

.crypto-tile {
  width: 179px;
  &__badge {
    top: 3px;
    right: 3px;
  }
  @media (max-width: 768px) {
    width: 160px;
    padding-left: 16px;
  }
}
</style>
