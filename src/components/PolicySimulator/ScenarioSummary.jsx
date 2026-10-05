export default function ScenarioSummary({ projectedWarming, baselineWarming, emissionsIndex, scenarioLabel, language }) {
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
