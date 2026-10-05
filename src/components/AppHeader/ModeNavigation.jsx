export default function ModeNavigation({ activeMode, language, onModeChange, copy }) {
  const isEnglish = language === 'en'

  return (
    <nav className="mode-tabs" aria-label={isEnglish ? 'Simulation modes' : 'Modos de simulação'}>
      <button className={activeMode === 'response' ? 'selected' : ''} aria-pressed={activeMode === 'response'} onClick={() => onModeChange('response')}>{copy.emergency}</button>
      <button className={activeMode === 'policy' ? 'selected' : ''} aria-pressed={activeMode === 'policy'} onClick={() => onModeChange('policy')}>{copy.policy}</button>
    </nav>
  )
}
