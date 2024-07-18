export type PaymentTypeInfo = {
  title: string
  commission: string
  min_amount: number
  description: string
  sort_order: number
}

export type CurrencyResponse = {
  success: boolean
  data: {
    default_currency: string
    currencies: Record<string, PaymentTypeInfo[]>
  }
}

export type Mnemo = 'RUB' | 'USD'

export const sendPaymentRequestToServer = (data: {
  currency: string
  sum: number
  method: 'crypto' | 'state'
}): Promise<string> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      Math.random() > 0.5 ? res('some-link') : rej('У-упс, что-то пошло не так')
    }, 500)
  })
}

export const getCurrencies = async (): Promise<CurrencyResponse | undefined> => {
  try {
    const response = await fetch('/api/payment/info/currencies.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const currencies = (await response.json()) as CurrencyResponse
    if (!currencies.success) {
      throw new Error('Не получилось :(')
    }
    return currencies
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
}

export const mnemoToFlagMap: Record<Mnemo, string> = {
  USD: 'united-states',
  RUB: 'russia'
}

export const getFlagImageSrcByMnemo = (mnemo: Mnemo) => {
  return `/flags/${mnemoToFlagMap[mnemo]}.png`
}

export const cyrrilicPaymentProviderNamesToLatin = {
  картой: 'card',
  'картой рф': 'visa-mastercard'
}

export const getPaymentProviderLogoSrc = (name: string) => {
  name = name.toLocaleLowerCase()
  name =
    // @ts-expect-error
    name in cyrrilicPaymentProviderNamesToLatin ? cyrrilicPaymentProviderNamesToLatin[name] : name
  return `/payment-options/${name}.png`
}

export const mnemoToSignMap = {
  crypto: '₿',
  RUB: '₽',
  USD: '$'
}
