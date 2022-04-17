export function getSpanValue(width: number) {
  if (width > 1200) {
    return 8
  } else if (width > 950) {
    return 12
  } else {
    return 24
  }
}
