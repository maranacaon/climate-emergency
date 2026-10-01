import { useEffect, useState } from 'react'
import PolicySimulator from './components/PolicySimulator'
import ResponseGame from './components/ResponseGame'
import './App.css'

function App() {
  const [activeMode, setActiveMode] = useState('response')
  const [language, setLanguage] = useState('en')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  useEffect(() => {
    const titles = {
      en: 'Limit | Interactive climate simulator',
      pt: 'Limiar | Simulador climático interativo',
    }
    const activeTitle = titles[language] || titles.en

    document.title = activeTitle
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const copy = {
    en: {
      brand: 'LIMIT',
      emergency: 'EMERGENCY RESPONSE',
      policy: 'POLICIES THROUGH 2100',
      live: 'ACTIVE SIMULATION',
      footer: ['EDUCATIONAL SIMULATION · FICTIONAL EVENT', 'PREPARE TODAY CHANGES TOMORROW', 'VERSION 01.0'],
    },
    pt: {
      brand: 'LIMIAR',
      emergency: 'RESPOSTA À EMERGÊNCIA',
      policy: 'POLÍTICAS ATÉ 2100',
      live: 'SIMULAÇÃO ATIVA',
      footer: ['SIMULAÇÃO EDUCATIVA · EVENTO FICTÍCIO', 'PREPARAR HOJE MUDA O AMANHÃ', 'VERSÃO 01.0'],
    },
  }

  useEffect(() => {
    if (!isLanguageMenuOpen) return

    const handlePointerDown = (event) => {
      if (!event.target.closest('.language-switch')) {
        setIsLanguageMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isLanguageMenuOpen])

  const t = copy[language] || copy.en

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label={language === 'en' ? 'Limit, start' : 'Limiar, início'}>
          <span className="wordmark-mark" aria-hidden="true">L</span>
          <span>{t.brand}<span className="wordmark-period">.</span></span>
        </a>

        <div className={`language-switch ${isLanguageMenuOpen ? 'open' : ''}`}>
          <button
            type="button"
            className="language-trigger"
            aria-label={language === 'en' ? 'Select language' : 'Selecione o idioma'}
            aria-haspopup="listbox"
            aria-expanded={isLanguageMenuOpen}
            onClick={() => setIsLanguageMenuOpen((open) => !open)}
          >
            <span className="language-globe" aria-hidden="true">◌</span>
            <span className="language-value">{language === 'en' ? 'EN' : 'PT-BR'}</span>
            <span className="language-caret" aria-hidden="true">▾</span>
          </button>

          {isLanguageMenuOpen && (
            <div className="language-menu" role="listbox" aria-label={language === 'en' ? 'Select language' : 'Selecione o idioma'}>
              {['en', 'pt'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className="language-option"
                  role="option"
                  aria-selected={language === option}
                  onClick={() => {
                    setLanguage(option)
                    setIsLanguageMenuOpen(false)
                  }}
                >
                  {option === 'en' ? 'EN' : 'PT-BR'}
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="mode-tabs" aria-label={language === 'en' ? 'Simulation modes' : 'Modos de simulação'}>
          <button className={activeMode === 'response' ? 'selected' : ''} aria-pressed={activeMode === 'response'} onClick={() => setActiveMode('response')}>{t.emergency}</button>
          <button className={activeMode === 'policy' ? 'selected' : ''} aria-pressed={activeMode === 'policy'} onClick={() => setActiveMode('policy')}>{t.policy}</button>
        </nav>
        <div className="live-status"><span /> {t.live}</div>
      </header>

      <div id="top">
        <div hidden={activeMode !== 'response'}>
          <ResponseGame language={language} />
        </div>
        <div hidden={activeMode !== 'policy'}>
          <PolicySimulator language={language} />
        </div>
      </div>
      <footer className="page-footer">
        {t.footer.map((item) => <span key={item}>{item}</span>)}
      </footer>
    </div>
  )
}

export default App
