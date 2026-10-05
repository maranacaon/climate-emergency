'use client'

import { useEffect, useState } from 'react'

function LanguageSwitcher({ language, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      if (!event.target.closest('.language-switch')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isOpen])

  const isEnglish = language === 'en'

  return (
    <div className={`language-switch ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="language-trigger"
        aria-label={isEnglish ? 'Select language' : 'Selecione o idioma'}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="language-globe" aria-hidden="true">◌</span>
        <span className="language-value">{isEnglish ? 'EN' : 'PT-BR'}</span>
        <span className="language-caret" aria-hidden="true">▾</span>
      </button>

      {isOpen && (
        <div className="language-menu" role="listbox" aria-label={isEnglish ? 'Select language' : 'Selecione o idioma'}>
          {['en', 'pt'].map((option) => (
            <button
              key={option}
              type="button"
              className="language-option"
              role="option"
              aria-selected={language === option}
              onClick={() => {
                onLanguageChange(option)
                setIsOpen(false)
              }}
            >
              {option === 'en' ? 'EN' : 'PT-BR'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AppHeader({ activeMode, language, onLanguageChange, onModeChange, copy }) {
  const isEnglish = language === 'en'

  return (
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label={isEnglish ? 'Limit, start' : 'Limiar, início'}>
        <span className="wordmark-mark" aria-hidden="true">L</span>
        <span>{copy.brand}<span className="wordmark-period">.</span></span>
      </a>

      <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />

      <nav className="mode-tabs" aria-label={isEnglish ? 'Simulation modes' : 'Modos de simulação'}>
        <button className={activeMode === 'response' ? 'selected' : ''} aria-pressed={activeMode === 'response'} onClick={() => onModeChange('response')}>{copy.emergency}</button>
        <button className={activeMode === 'policy' ? 'selected' : ''} aria-pressed={activeMode === 'policy'} onClick={() => onModeChange('policy')}>{copy.policy}</button>
      </nav>
      <div className="live-status"><span /> {copy.live}</div>
    </header>
  )
}
