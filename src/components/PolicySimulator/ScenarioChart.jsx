import buildTrend from './buildTrend'

export default function ScenarioChart({ projectedWarming, baselineWarming, currentWarming, language }) {
  const baselinePoints = buildTrend(baselineWarming, baselineWarming, currentWarming)
  const scenarioPoints = buildTrend(projectedWarming, baselineWarming, currentWarming)
  const isEnglish = language === 'en'

  return (
    <section className="projection-panel" aria-labelledby="projection-title">
      <div className="projection-head">
        <div><span className="section-kicker">{isEnglish ? 'ILLUSTRATIVE PROJECTION FOR 2100' : 'PROJEÇÃO ILUSTRATIVA PARA 2100'}</span><h2 id="projection-title">{isEnglish ? 'Estimated global warming' : 'Aquecimento global estimado'}</h2></div>
        <div className="temperature-reading"><strong>{projectedWarming.toFixed(1)}°</strong><span>C</span></div>
      </div>
      <div className="trend-chart">
        <div className="chart-y-labels"><span>3,3°</span><span>2,6°</span><span>1,9°</span><span>1,3°</span></div>
        <svg viewBox="0 0 535 190" role="img" aria-label={isEnglish ? `Base trajectory to ${baselineWarming.toFixed(1)} degrees and current scenario to ${projectedWarming.toFixed(1)} degrees in 2100` : `Trajetória-base até ${baselineWarming.toFixed(1)} graus e cenário atual até ${projectedWarming.toFixed(1)} graus em 2100`}>
          <line x1="42" y1="38" x2="534" y2="38" className="chart-gridline" />
          <line x1="42" y1="79" x2="534" y2="79" className="chart-gridline" />
          <line x1="42" y1="120" x2="534" y2="120" className="chart-gridline" />
          <line x1="42" y1="162" x2="534" y2="162" className="chart-gridline" />
          <line x1="42" y1="150" x2="534" y2="150" className="chart-targetline" />
          <polyline points={baselinePoints} className="chart-baseline" />
          <polyline points={scenarioPoints} className="chart-scenario" />
          {scenarioPoints.split(' ').map((point) => {
            const [cx, cy] = point.split(',')
            return <circle key={point} cx={cx} cy={cy} r="3.5" className="chart-point" />
          })}
          <text x="430" y="144" className="chart-target-label">{isEnglish ? 'LIMIT 1.5°' : 'LIMITE 1,5°'}</text>
        </svg>
        <div className="chart-years"><span>2026</span><span>2040</span><span>2060</span><span>2080</span><span>2100</span></div>
      </div>
      <div className="chart-legend"><span><i className="legend-scenario" /> {isEnglish ? 'YOUR SCENARIO' : 'SEU CENÁRIO'}</span><span><i className="legend-baseline" /> {isEnglish ? 'BASE TRAJECTORY' : 'TRAJETÓRIA-BASE'}</span><span><i className="legend-target" /> {isEnglish ? '1.5°C LIMIT' : 'LIMITE DE 1,5°C'}</span></div>
    </section>
  )
}
