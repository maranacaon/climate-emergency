import { useState } from 'react'
import PolicySimulator from './components/PolicySimulator'
import ResponseGame from './components/ResponseGame'
import './App.css'

function App() {
  const [activeMode, setActiveMode] = useState('response')

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Limiar, início">
          <span className="wordmark-mark" aria-hidden="true">L</span>
          <span>LIMIAR<span className="wordmark-period">.</span></span>
        </a>
        <nav className="mode-tabs" aria-label="Modos de simulação">
          <button className={activeMode === 'response' ? 'selected' : ''} aria-pressed={activeMode === 'response'} onClick={() => setActiveMode('response')}>RESPOSTA À EMERGÊNCIA</button>
          <button className={activeMode === 'policy' ? 'selected' : ''} aria-pressed={activeMode === 'policy'} onClick={() => setActiveMode('policy')}>POLÍTICAS ATÉ 2100</button>
        </nav>
        <div className="live-status"><span /> SIMULAÇÃO ATIVA</div>
      </header>

      <div id="top">
        <div hidden={activeMode !== 'response'}>
          <ResponseGame />
        </div>
        <div hidden={activeMode !== 'policy'}>
          <PolicySimulator />
        </div>
      </div>
      <footer className="page-footer"><span>SIMULAÇÃO EDUCATIVA · EVENTO FICTÍCIO</span><span>PREPARAR HOJE MUDA O AMANHÃ</span><span>VERSÃO 01.0</span></footer>
    </div>
  )
}

export default App
