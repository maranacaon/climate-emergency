import { useEffect, useState } from 'react'

const appCopyByLanguage = {
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

const pageTitles = {
  en: 'Limit | Interactive climate simulator',
  pt: 'Limiar | Simulador climático interativo',
}

export function useAppController() {
  const [activeMode, setActiveMode] = useState('response')
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    document.title = pageTitles[language] || pageTitles.en
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  return {
    activeMode,
    language,
    copy: appCopyByLanguage[language] || appCopyByLanguage.en,
    selectMode: setActiveMode,
    selectLanguage: setLanguage,
  }
}
