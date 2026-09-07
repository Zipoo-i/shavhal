/**
 * Formats a number as a price in Russian rubles, e.g. 349 -> "349 ₽".
 * Kept in one place so the currency/format is easy to change later.
 */
export function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`;
}
