import { useEffect, useState } from 'react'
import PolicySimulator from './components/PolicySimulator'
import ResponseGame from './components/ResponseGame'
import './App.css'

function App() {
  const [activeMode, setActiveMode] = useState('response')
  const [language, setLanguage] = useState('en')

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

  const t = copy[language] || copy.en

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label={language === 'en' ? 'Limit, start' : 'Limiar, início'}>
          <span className="wordmark-mark" aria-hidden="true">L</span>
          <span>{t.brand}<span className="wordmark-period">.</span></span>
        </a>

        <div className="language-switch">
          <span className="language-globe" aria-hidden="true">◌</span>
          <label className="sr-only" htmlFor="language-select">
            {language === 'en' ? 'Select language' : 'Selecione o idioma'}
          </label>
          <select
            id="language-select"
            className="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={language === 'en' ? 'Select language' : 'Selecione o idioma'}
          >
            <option value="en">EN</option>
            <option value="pt">PT-BR</option>
          </select>
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
