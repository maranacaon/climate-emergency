'use client'

import { useLanguageMenu } from '../../hooks/useLanguageMenu'

export default function LanguageSwitcher({ language, onLanguageChange }) {
  const { isOpen, toggle, select } = useLanguageMenu(onLanguageChange)
  const isEnglish = language === 'en'

  return (
    <div className={`language-switch ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="language-trigger"
        aria-label={isEnglish ? 'Select language' : 'Selecione o idioma'}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggle}
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
              onClick={() => select(option)}
            >
              {option === 'en' ? 'EN' : 'PT-BR'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
