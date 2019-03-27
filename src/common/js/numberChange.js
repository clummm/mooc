export function number2character (n) {
  if (n === 1) return '一'
  else if (n === 2) return '二'
  else if (n === 3) return '三'
  else if (n === 4) return '四'
  else if (n === 5) return '五'
  else if (n === 6) return '六'
  else if (n === 7) return '七'
  else if (n === 8) return '八'
  else if (n === 9) return '九'
  else if (n === 10) return '十'
  else if (n > 10 && n < 20) {
    return '十' + number2character(n % 10)
  } else if (n >= 20 && n < 100) {
    return number2character(n / 10) + '十' + number2character(n % 10)
  }
}
