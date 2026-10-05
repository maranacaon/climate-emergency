import { usePolicyScenario } from '../hooks/usePolicyScenario'

const policyLeversByLanguage = {
  en: [
    { key: 'cleanEnergy', label: 'Clean energy', detail: 'Accelerate solar, wind, and storage.', warmingEffect: 0.38, emissionsEffect: 19, color: 'green' },
    { key: 'efficiency', label: 'Energy efficiency', detail: 'Reduce energy use in buildings and industry.', warmingEffect: 0.22, emissionsEffect: 11, color: 'blue' },
    { key: 'transport', label: 'Public transport', detail: 'Expand buses, trains, and active mobility.', warmingEffect: 0.18, emissionsEffect: 9, color: 'yellow' },
    { key: 'forests', label: 'Forests', detail: 'Protect ecosystems and restore degraded land.', warmingEffect: 0.24, emissionsEffect: 13, color: 'green' },
    { key: 'methane', label: 'Methane and waste', detail: 'Reduce leaks, waste, and sector emissions.', warmingEffect: 0.25, emissionsEffect: 15, color: 'coral' },
    { key: 'fossilFuel', label: 'Fossil transition', detail: 'Phase down coal, oil, and gas gradually.', warmingEffect: 0.23, emissionsEffect: 13, color: 'orange' },
  ],
  pt: [
    { key: 'cleanEnergy', label: 'Energia limpa', detail: 'Acelerar solar, eólica e armazenamento.', warmingEffect: 0.38, emissionsEffect: 19, color: 'green' },
    { key: 'efficiency', label: 'Eficiência energética', detail: 'Fazer edifícios e indústria usarem menos energia.', warmingEffect: 0.22, emissionsEffect: 11, color: 'blue' },
    { key: 'transport', label: 'Transporte coletivo', detail: 'Ampliar ônibus, trens e mobilidade ativa.', warmingEffect: 0.18, emissionsEffect: 9, color: 'yellow' },
    { key: 'forests', label: 'Florestas', detail: 'Proteger ecossistemas e restaurar áreas degradadas.', warmingEffect: 0.24, emissionsEffect: 13, color: 'green' },
    { key: 'methane', label: 'Metano e resíduos', detail: 'Reduzir vazamentos, desperdício e emissões do setor.', warmingEffect: 0.25, emissionsEffect: 15, color: 'coral' },
    { key: 'fossilFuel', label: 'Transição dos fósseis', detail: 'Reduzir gradualmente carvão, petróleo e gás.', warmingEffect: 0.23, emissionsEffect: 13, color: 'orange' },
  ],
}

const trendFactors = [0, 0.16, 0.38, 0.68, 1]

function buildTrend(endTemperature, baselineWarming, currentWarming) {
  return trendFactors.map((factor, index) => {
    const x = 42 + index * 123
    const temperature = currentWarming + (endTemperature - currentWarming) * factor
    const y = 162 - ((temperature - currentWarming) / (baselineWarming - currentWarming)) * 124
    return `${x},${y}`
  }).join(' ')
}

function ScenarioChart({ projectedWarming, baselineWarming, currentWarming, language }) {
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
          {scenarioPoints.split(' ').map((point, index) => {
            const [cx, cy] = point.split(',')
            return <circle key={index} cx={cx} cy={cy} r="3.5" className="chart-point" />
          })}
          <text x="430" y="144" className="chart-target-label">{isEnglish ? 'LIMIT 1.5°' : 'LIMITE 1,5°'}</text>
        </svg>
        <div className="chart-years"><span>2026</span><span>2040</span><span>2060</span><span>2080</span><span>2100</span></div>
      </div>
      <div className="chart-legend"><span><i className="legend-scenario" /> {isEnglish ? 'YOUR SCENARIO' : 'SEU CENÁRIO'}</span><span><i className="legend-baseline" /> {isEnglish ? 'BASE TRAJECTORY' : 'TRAJETÓRIA-BASE'}</span><span><i className="legend-target" /> {isEnglish ? '1.5°C LIMIT' : 'LIMITE DE 1,5°C'}</span></div>
    </section>
  )
}

function PolicyControl({ policy, value, onPolicyChange, language }) {
  const inputId = `policy-${policy.key}`
  const isEnglish = language === 'en'

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
        aria-label={`${policy.label}: ${value} ${isEnglish ? 'percent' : 'por cento'}`}
        style={{ '--range-value': `${value}%` }}
      />
      <div className="slider-labels"><span>{isEnglish ? 'LOW' : 'BAIXO'}</span><span>{isEnglish ? 'HIGH' : 'ALTO'}</span></div>
    </div>
  )
}

function PolicyControls({ policyLevers, policyValues, onPolicyChange, onReset, language }) {
  const isEnglish = language === 'en'

  return (
    <section className="policy-section" aria-labelledby="policy-title">
      <div className="policy-section-heading">
        <div><span className="section-kicker">{isEnglish ? 'SIX TRANSFORMATION LEVERS' : 'SEIS ALAVANCAS DE TRANSFORMAÇÃO'}</span><h2 id="policy-title">{isEnglish ? 'Adjust the level of action' : 'Ajuste o nível de ação'}</h2></div>
        <button className="reset-policies" onClick={onReset} aria-label={isEnglish ? 'Restore initial values' : 'Restaurar valores iniciais'}>{isEnglish ? 'RESET SCENARIO' : 'REINICIAR CENÁRIO'} <span aria-hidden="true">↺</span></button>
      </div>
      <div className="policy-grid">
        {policyLevers.map((policy) => (
          <PolicyControl
            key={policy.key}
            policy={policy}
            value={policyValues[policy.key]}
            onPolicyChange={onPolicyChange}
            language={language}
          />
        ))}
      </div>
    </section>
  )
}

function ScenarioSummary({ projectedWarming, baselineWarming, emissionsIndex, scenarioLabel, language }) {
  const isEnglish = language === 'en'

  return (
    <aside className="strategy-aside" aria-label={isEnglish ? 'Scenario summary' : 'Resumo do cenário'}>
      <div className="aside-kicker">{isEnglish ? 'YOUR SCENARIO' : 'SEU CENÁRIO'}</div>
      <div className="scenario-status">{scenarioLabel}</div>
      <div className="aside-divider" />
      <div className="aside-metric"><span>{isEnglish ? 'RELATIVE EMISSIONS' : 'EMISSÕES RELATIVAS'}</span><strong>{emissionsIndex}<small> / 100</small></strong><div className="emissions-track"><i style={{ width: `${emissionsIndex}%` }} /></div><small>{isEnglish ? 'SCHEMATIC INDEX' : 'ÍNDICE ESQUEMÁTICO'}</small></div>
      <div className="aside-metric warming-delta"><span>{isEnglish ? 'REDUCTION VS. BASE' : 'REDUÇÃO VS. BASE'}</span><strong>−{(baselineWarming - projectedWarming).toFixed(1)}<small>°C</small></strong><small>{isEnglish ? 'IN THE 2100 PROJECTION' : 'NA PROJEÇÃO PARA 2100'}</small></div>
      <div className="aside-divider" />
      <div className="target-note"><span className="target-ring">1,5°</span><div><strong>{isEnglish ? 'Paris Agreement target' : 'Meta do Acordo de Paris'}</strong><p>{isEnglish ? 'Global effort to limit warming and reduce climate risks.' : 'Esforço global para limitar o aquecimento e reduzir riscos climáticos.'}</p></div></div>
      <div className="model-note"><strong>{isEnglish ? 'About this model' : 'Sobre este modelo'}</strong><p>{isEnglish ? 'This prototype uses simplified relationships for educational purposes. It is not the scientific model of En-ROADS or a forecast; real outcomes depend on many factors.' : 'Este protótipo usa relações simplificadas para fins educativos. Não é o modelo científico do En-ROADS nem uma previsão; resultados reais dependem de muitos fatores.'}</p></div>
    </aside>
  )
}

function PolicySimulator({ language = 'en' }) {
  const policyLevers = policyLeversByLanguage[language] || policyLeversByLanguage.en
  const scenario = usePolicyScenario(policyLevers, language)

  return (
    <main className="strategy-layout">
      <div className="strategy-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> {language === 'en' ? 'SCENARIO LAB · 2026–2100' : 'LABORATÓRIO DE CENÁRIOS · 2026–2100'}</div>
          <h1>{language === 'en' ? 'The future is not\nfixed.' : 'O futuro não está\ndecidido.'}</h1>
          <p className="intro-copy">{language === 'en' ? 'Combine climate policies and track how collective decisions can shift emissions and warming trajectories.' : 'Combine políticas climáticas e acompanhe como escolhas coletivas podem mudar a trajetória de emissões e aquecimento.'}</p>
        </div>
        <div className="scenario-badge"><span className="scenario-pulse" /> {language === 'en' ? 'CUSTOMIZED SCENARIO' : 'CENÁRIO PERSONALIZADO'}</div>
      </div>
      <div className="strategy-grid">
        <div className="strategy-main">
          <ScenarioChart
            projectedWarming={scenario.projectedWarming}
            baselineWarming={scenario.baselineWarming}
            currentWarming={scenario.currentWarming}
            language={language}
          />
          <PolicyControls
            policyLevers={policyLevers}
            policyValues={scenario.policyValues}
            onPolicyChange={scenario.updatePolicy}
            onReset={scenario.resetScenario}
            language={language}
          />
        </div>
        <ScenarioSummary
          projectedWarming={scenario.projectedWarming}
          baselineWarming={scenario.baselineWarming}
          emissionsIndex={scenario.emissionsIndex}
          scenarioLabel={scenario.scenarioLabel}
          language={language}
        />
      </div>
    </main>
  )
}

export default PolicySimulator