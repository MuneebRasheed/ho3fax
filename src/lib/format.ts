export function formatEstimate(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value)
}
