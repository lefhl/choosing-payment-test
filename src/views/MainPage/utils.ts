export const conventionalWaysToPay: PayWayInfo[] = [
  {
    name: 'Картой РФ',
    icon: 'visa-mastercard',
    comission: '8%'
  },
  {
    name: 'Картой МИР',
    icon: 'mir',
    comission: '8%'
  },
  {
    name: 'СБП',
    icon: 'sbp',
    comission: '8%'
  },
  {
    name: 'Payeer',
    icon: 'payeer',
    comission: '8%'
  },
  {
    name: 'SteamPay',
    icon: 'steampay',
    comission: '8%'
  },
  {
    name: 'Мегафон',
    icon: 'megafon',
    comission: '8%'
  },
  {
    name: 'Билайн',
    icon: 'beeline',
    comission: '8%'
  },
  {
    name: 'Теле2',
    icon: 'tele2',
    comission: '8%'
  },
  {
    name: 'PayPal',
    icon: 'paypal',
    comission: '8%'
  },
  {
    name: 'Stripe',
    icon: 'stripe',
    comission: '8%'
  },
  {
    name: 'FKWallet',
    icon: 'fkwallet',
    comission: '8%'
  },
  {
    name: 'Lava',
    icon: 'lava',
    comission: '8%'
  },
  {
    name: 'Volet',
    icon: 'volet',
    comission: '8%'
  },
  {
    name: 'PerfectMoney',
    icon: 'perfectmoney',
    comission: '8%'
  },
  {
    name: 'Другой',
    icon: 'card',
    comission: '8%'
  }
]

export const cryptoWaysToPay: PayWayInfo[] = [
  {
    name: 'Cryptomus',
    icon: 'cryptomus',
    comission: '8%'
  }
]

export type PayWayInfo = {
  name: string
  icon: string
  comission: string
}

export type CurrencyInfo = {
  mnemo: string
  flag: string
}

export const getAllWaysToPay = (
  currency: string
): Promise<{
  state: PayWayInfo[]
  crypto: PayWayInfo[]
}> => {
  return new Promise((res) => {
    setTimeout(() => {
      // Типа запрос на сервак, параметр для видимости
      res({
        state: conventionalWaysToPay,
        crypto: cryptoWaysToPay
      })
    }, 500)
  })
}

export const getAllCurrencies = (): Promise<CurrencyInfo[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          mnemo: 'RUB',
          flag: 'russia'
        },
        {
          mnemo: 'USD',
          flag: 'united-states'
        },
        {
          mnemo: 'EUR',
          flag: 'european-union'
        },
        {
          mnemo: 'BYN',
          flag: 'belarus'
        },
        {
          mnemo: 'KZT',
          flag: 'kazakhstan'
        },
        {
          mnemo: 'UZS',
          flag: 'azerbaijan'
        },
        {
          mnemo: 'AZN',
          flag: 'uzbekistan'
        },
        {
          mnemo: 'UAH',
          flag: 'ukraine'
        },
        {
          mnemo: 'KRW',
          flag: 'south-korea'
        },
        {
          mnemo: 'INR',
          flag: 'india'
        },
        {
          mnemo: 'IDR',
          flag: 'indonesia'
        }
      ])
    }, 500)
  })
}

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
