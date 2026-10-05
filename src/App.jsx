'use client'

import { useAppController } from './hooks/useAppController'
import AppHeader from './components/AppHeader'
import PolicySimulator from './components/PolicySimulator'
import ResponseGame from './components/ResponseGame'

function App() {
  const { activeMode, language, copy, selectMode, selectLanguage } = useAppController()

  return (
    <div className="app-shell">
      <AppHeader
        activeMode={activeMode}
        language={language}
        onLanguageChange={selectLanguage}
        onModeChange={selectMode}
        copy={copy}
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
        {copy.footer.map((item) => <span key={item}>{item}</span>)}
      </footer>
    </div>
  )
}

export default App
