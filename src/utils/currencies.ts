export const prettifySum = (sum: string | number) =>
  new Intl.NumberFormat('de-DE').format(Number(sum))
