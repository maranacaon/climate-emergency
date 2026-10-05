import PolicyControl from './PolicyControl'

export default function PolicyControls({ policyLevers, policyValues, onPolicyChange, onReset, language }) {
  const isEnglish = language === 'en'

  return (
    <section className="policy-section" aria-labelledby="policy-title">
      <div className="policy-section-heading">
        <div><span className="section-kicker">{isEnglish ? 'SIX TRANSFORMATION LEVERS' : 'SEIS ALAVANCAS DE TRANSFORMAÇÃO'}</span><h2 id="policy-title">{isEnglish ? 'Adjust the level of action' : 'Ajuste o nível de ação'}</h2></div>
        <button className="reset-policies" onClick={onReset} aria-label={isEnglish ? 'Restore initial values' : 'Restaurar valores iniciais'}>{isEnglish ? 'RESET SCENARIO' : 'REINICIAR CENÁRIO'} <span aria-hidden="true">↺</span></button>
      </div>
      <div className="policy-grid">
        {policyLevers.map((policy) => <PolicyControl key={policy.key} policy={policy} value={policyValues[policy.key]} onPolicyChange={onPolicyChange} language={language} />)}
      </div>
    </section>
  )
}
