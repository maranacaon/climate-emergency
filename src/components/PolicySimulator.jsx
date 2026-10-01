import { useState } from 'react'

const policyLevers = [
  { key: 'cleanEnergy', label: 'Energia limpa', detail: 'Acelerar solar, eólica e armazenamento.', warmingEffect: 0.38, emissionsEffect: 19, color: 'green' },
  { key: 'efficiency', label: 'Eficiência energética', detail: 'Fazer edifícios e indústria usarem menos energia.', warmingEffect: 0.22, emissionsEffect: 11, color: 'blue' },
  { key: 'transport', label: 'Transporte coletivo', detail: 'Ampliar ônibus, trens e mobilidade ativa.', warmingEffect: 0.18, emissionsEffect: 9, color: 'yellow' },
  { key: 'forests', label: 'Florestas', detail: 'Proteger ecossistemas e restaurar áreas degradadas.', warmingEffect: 0.24, emissionsEffect: 13, color: 'green' },
  { key: 'methane', label: 'Metano e resíduos', detail: 'Reduzir vazamentos, desperdício e emissões do setor.', warmingEffect: 0.25, emissionsEffect: 15, color: 'coral' },
  { key: 'fossilFuel', label: 'Transição dos fósseis', detail: 'Reduzir gradualmente carvão, petróleo e gás.', warmingEffect: 0.23, emissionsEffect: 13, color: 'orange' },
]

const initialPolicyValues = {
  cleanEnergy: 35,
  efficiency: 30,
  transport: 25,
  forests: 35,
  methane: 25,
  fossilFuel: 20,
}
const baselineWarming = 3.3
const currentWarming = 1.3
const trendFactors = [0, 0.16, 0.38, 0.68, 1]

function buildTrend(endTemperature, baselineWarming, currentWarming) {
  return trendFactors.map((factor, index) => {
    const x = 42 + index * 123
    const temperature = currentWarming + (endTemperature - currentWarming) * factor
    const y = 162 - ((temperature - currentWarming) / (baselineWarming - currentWarming)) * 124
    return `${x},${y}`
  }).join(' ')
}

function ScenarioChart({ projectedWarming, baselineWarming, currentWarming }) {
  const baselinePoints = buildTrend(baselineWarming, baselineWarming, currentWarming)
  const scenarioPoints = buildTrend(projectedWarming, baselineWarming, currentWarming)

  return (
    <section className="projection-panel" aria-labelledby="projection-title">
      <div className="projection-head">
        <div><span className="section-kicker">PROJEÇÃO ILUSTRATIVA PARA 2100</span><h2 id="projection-title">Aquecimento global estimado</h2></div>
        <div className="temperature-reading"><strong>{projectedWarming.toFixed(1)}°</strong><span>C</span></div>
      </div>
      <div className="trend-chart">
        <div className="chart-y-labels"><span>3,3°</span><span>2,6°</span><span>1,9°</span><span>1,3°</span></div>
        <svg viewBox="0 0 535 190" role="img" aria-label={`Trajetória-base até ${baselineWarming.toFixed(1)} graus e cenário atual até ${projectedWarming.toFixed(1)} graus em 2100`}>
          <line x1="42" y1="38" x2="534" y2="38" className="chart-gridline" />
          <line x1="42" y1="79" x2="534" y2="79" className="chart-gridline" />
          <line x1="42" y1="120" x2="534" y2="120" className="chart-gridline" />
          <line x1="42" y1="162" x2="534" y2="162" className="chart-gridline" />
          <line x1="42" y1="150" x2="534" y2="150" className="chart-targetline" />
          <polyline points={baselinePoints} className="chart-baseline" />
          <polyline points={scenarioPoints} className="chart-scenario" />
          {scenarioPoints.split(' ').map((point, index) => {
            const [cx, cy] = point.split(',')
            return <circle key={index} cx={cx} cy={cy} r="3.5" className="chart-point" />
          })}
          <text x="430" y="144" className="chart-target-label">LIMITE 1,5°</text>
        </svg>
        <div className="chart-years"><span>2026</span><span>2040</span><span>2060</span><span>2080</span><span>2100</span></div>
      </div>
      <div className="chart-legend"><span><i className="legend-scenario" /> SEU CENÁRIO</span><span><i className="legend-baseline" /> TRAJETÓRIA-BASE</span><span><i className="legend-target" /> LIMITE DE 1,5°C</span></div>
    </section>
  )
}

function PolicyControl({ policy, value, onPolicyChange }) {
  const inputId = `policy-${policy.key}`

  return (
    <div className="policy-control">
      <div className="policy-control-heading"><label htmlFor={inputId}>{policy.label}</label><output htmlFor={inputId}>{value}%</output></div>
      <p>{policy.detail}</p>
      <input
        id={inputId}
        className={`policy-slider ${policy.color}`}
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        onChange={(event) => onPolicyChange(policy.key, event.target.value)}
        aria-label={`${policy.label}: ${value} por cento`}
        style={{ '--range-value': `${value}%` }}
      />
      <div className="slider-labels"><span>BAIXO</span><span>ALTO</span></div>
    </div>
  )
}

function PolicyControls({ policyLevers, policyValues, onPolicyChange, onReset }) {
  return (
    <section className="policy-section" aria-labelledby="policy-title">
      <div className="policy-section-heading">
        <div><span className="section-kicker">SEIS ALAVANCAS DE TRANSFORMAÇÃO</span><h2 id="policy-title">Ajuste o nível de ação</h2></div>
        <button className="reset-policies" onClick={onReset} aria-label="Restaurar valores iniciais">REINICIAR CENÁRIO <span aria-hidden="true">↺</span></button>
      </div>
      <div className="policy-grid">
        {policyLevers.map((policy) => (
          <PolicyControl
            key={policy.key}
            policy={policy}
            value={policyValues[policy.key]}
            onPolicyChange={onPolicyChange}
          />
        ))}
      </div>
    </section>
  )
}

function ScenarioSummary({ projectedWarming, baselineWarming, emissionsIndex, scenarioLabel }) {
  return (
    <aside className="strategy-aside" aria-label="Resumo do cenário">
      <div className="aside-kicker">SEU CENÁRIO</div>
      <div className="scenario-status">{scenarioLabel}</div>
      <div className="aside-divider" />
      <div className="aside-metric"><span>EMISSÕES RELATIVAS</span><strong>{emissionsIndex}<small> / 100</small></strong><div className="emissions-track"><i style={{ width: `${emissionsIndex}%` }} /></div><small>ÍNDICE ESQUEMÁTICO</small></div>
      <div className="aside-metric warming-delta"><span>REDUÇÃO VS. BASE</span><strong>−{(baselineWarming - projectedWarming).toFixed(1)}<small>°C</small></strong><small>NA PROJEÇÃO PARA 2100</small></div>
      <div className="aside-divider" />
      <div className="target-note"><span className="target-ring">1,5°</span><div><strong>Meta do Acordo de Paris</strong><p>Esforço global para limitar o aquecimento e reduzir riscos climáticos.</p></div></div>
      <div className="model-note"><strong>Sobre este modelo</strong><p>Este protótipo usa relações simplificadas para fins educativos. Não é o modelo científico do En-ROADS nem uma previsão; resultados reais dependem de muitos fatores.</p></div>
    </aside>
  )
}

function PolicySimulator() {
  const [policyValues, setPolicyValues] = useState(initialPolicyValues)
  const warmingReduction = policyLevers.reduce(
    (total, policy) => total + (policyValues[policy.key] / 100) * policy.warmingEffect,
    0,
  )
  const projectedWarming = Math.max(1.8, baselineWarming - warmingReduction)
  const emissionsIndex = Math.max(
    20,
    Math.round(
      100 - policyLevers.reduce(
        (total, policy) => total + (policyValues[policy.key] / 100) * policy.emissionsEffect,
        0,
      ),
    ),
  )
  const scenarioLabel = projectedWarming <= 2
    ? 'Ação climática acelerada'
    : projectedWarming <= 2.6
      ? 'Transição em andamento'
      : 'A distância do limite segue alta'

  function updatePolicy(key, value) {
    setPolicyValues((current) => ({ ...current, [key]: Number(value) }))
  }

  return (
    <main className="strategy-layout">
      <div className="strategy-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> LABORATÓRIO DE CENÁRIOS · 2026–2100</div>
          <h1>O futuro não está<br />decidido.</h1>
          <p className="intro-copy">Combine políticas climáticas e acompanhe como escolhas coletivas podem mudar a trajetória de emissões e aquecimento.</p>
        </div>
        <div className="scenario-badge"><span className="scenario-pulse" /> CENÁRIO PERSONALIZADO</div>
      </div>
      <div className="strategy-grid">
        <div className="strategy-main">
          <ScenarioChart
            projectedWarming={projectedWarming}
            baselineWarming={baselineWarming}
            currentWarming={currentWarming}
          />
          <PolicyControls
            policyLevers={policyLevers}
            policyValues={policyValues}
            onPolicyChange={updatePolicy}
            onReset={() => setPolicyValues(initialPolicyValues)}
          />
        </div>
        <ScenarioSummary
          projectedWarming={projectedWarming}
          baselineWarming={baselineWarming}
          emissionsIndex={emissionsIndex}
          scenarioLabel={scenarioLabel}
        />
      </div>
    </main>
  )
}

export default PolicySimulator