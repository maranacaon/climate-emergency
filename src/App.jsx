'use client'

import { useEffect, useState } from 'react'
import AppHeader from './components/AppHeader'
import PolicySimulator from './components/PolicySimulator'
import ResponseGame from './components/ResponseGame'

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
      <AppHeader
        activeMode={activeMode}
        language={language}
        onLanguageChange={setLanguage}
        onModeChange={setActiveMode}
        copy={t}
      />

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
