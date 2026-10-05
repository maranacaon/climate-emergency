'use client'

import { usePolicyScenario } from '../../hooks/usePolicyScenario'
import PolicyControls from './PolicyControls'
import ScenarioChart from './ScenarioChart'
import ScenarioSummary from './ScenarioSummary'

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

export default function PolicySimulator({ language = 'en' }) {
  const policyLevers = policyLeversByLanguage[language] || policyLeversByLanguage.en
  const scenario = usePolicyScenario(policyLevers, language)
  const isEnglish = language === 'en'

  return (
    <main className="strategy-layout">
      <div className="strategy-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> {isEnglish ? 'SCENARIO LAB · 2026–2100' : 'LABORATÓRIO DE CENÁRIOS · 2026–2100'}</div>
          <h1>{isEnglish ? 'The future is not\nfixed.' : 'O futuro não está\ndecidido.'}</h1>
          <p className="intro-copy">{isEnglish ? 'Combine climate policies and track how collective decisions can shift emissions and warming trajectories.' : 'Combine políticas climáticas e acompanhe como escolhas coletivas podem mudar a trajetória de emissões e aquecimento.'}</p>
        </div>
        <div className="scenario-badge"><span className="scenario-pulse" /> {isEnglish ? 'CUSTOMIZED SCENARIO' : 'CENÁRIO PERSONALIZADO'}</div>
      </div>
      <div className="strategy-grid">
        <div className="strategy-main">
          <ScenarioChart projectedWarming={scenario.projectedWarming} baselineWarming={scenario.baselineWarming} currentWarming={scenario.currentWarming} language={language} />
          <PolicyControls policyLevers={policyLevers} policyValues={scenario.policyValues} onPolicyChange={scenario.updatePolicy} onReset={scenario.resetScenario} language={language} />
        </div>
        <ScenarioSummary projectedWarming={scenario.projectedWarming} baselineWarming={scenario.baselineWarming} emissionsIndex={scenario.emissionsIndex} scenarioLabel={scenario.scenarioLabel} language={language} />
      </div>
    </main>
  )
}
