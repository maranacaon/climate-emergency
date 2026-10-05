'use client'

import LanguageSwitcher from './LanguageSwitcher'
import ModeNavigation from './ModeNavigation'

export default function AppHeader({ activeMode, language, onLanguageChange, onModeChange, copy }) {
  const isEnglish = language === 'en'

  return (
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label={isEnglish ? 'Limit, start' : 'Limiar, início'}>
        <span className="wordmark-mark" aria-hidden="true">L</span>
        <span>{copy.brand}<span className="wordmark-period">.</span></span>
      </a>
      <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
      <ModeNavigation activeMode={activeMode} language={language} onModeChange={onModeChange} copy={copy} />
      <div className="live-status"><span /> {copy.live}</div>
    </header>
  )
}
