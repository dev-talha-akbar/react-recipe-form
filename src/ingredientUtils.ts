export function formatQuantity(quantity: number, pattern: string) {
  return pattern.replace("{quantity}", quantity.toString());
}
