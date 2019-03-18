// 播放器中显示时间转换
export function secToTimer (originalSec) {
  const sec = Math.floor(originalSec % 60)
  var time = originalSec / 60
  const min = Math.floor(time % 60)
  time /= 60
  const hour = Math.floor(time)
  const hourStr = hour < 10 ? `0${hour}` : String(hour)
  const minStr = min < 10 ? `0${min}` : String(min)
  const secStr = sec < 10 ? `0${sec}` : String(sec)

  return hour > 0 ? `${hourStr}:${minStr}:${secStr}` : `${minStr}:${secStr}`
}

// 格式化时间
/**
 * @return {string}
 */
export function DateFormatter (date) {
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${date.getFullYear()}-${month}-${day}`
}
