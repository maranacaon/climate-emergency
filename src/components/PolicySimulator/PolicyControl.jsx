export default function PolicyControl({ policy, value, onPolicyChange, language }) {
  const inputId = `policy-${policy.key}`
  const isEnglish = language === 'en'

  return (
    <div className="policy-control">
      <div className="policy-control-heading"><label htmlFor={inputId}>{policy.label}</label><output htmlFor={inputId}>{value}%</output></div>
      <p>{policy.detail}</p>
      <input id={inputId} className={`policy-slider ${policy.color}`} type="range" min="0" max="100" step="5" value={value} onChange={(event) => onPolicyChange(policy.key, event.target.value)} aria-label={`${policy.label}: ${value} ${isEnglish ? 'percent' : 'por cento'}`} style={{ '--range-value': `${value}%` }} />
      <div className="slider-labels"><span>{isEnglish ? 'LOW' : 'BAIXO'}</span><span>{isEnglish ? 'HIGH' : 'ALTO'}</span></div>
    </div>
  )
}
