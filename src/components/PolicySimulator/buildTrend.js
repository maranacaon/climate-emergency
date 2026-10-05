const trendFactors = [0, 0.16, 0.38, 0.68, 1]

export default function buildTrend(endTemperature, baselineWarming, currentWarming) {
  return trendFactors.map((factor, index) => {
    const x = 42 + index * 123
    const temperature = currentWarming + (endTemperature - currentWarming) * factor
    const y = 162 - ((temperature - currentWarming) / (baselineWarming - currentWarming)) * 124
    return `${x},${y}`
  }).join(' ')
}
