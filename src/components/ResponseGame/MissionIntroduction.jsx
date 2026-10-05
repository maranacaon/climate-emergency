export default function MissionIntroduction({ round, roundIndex, rounds, finished, outcome, language, copy }) {
  const isEnglish = language === 'en'

  return (
    <div className="intro-row">
      <div>
        <div className="eyebrow"><span className="eyebrow-line" /> {finished ? copy.missionClosed : round.time}</div>
        <h1>{finished ? outcome : copy.introText}</h1>
        <p className="intro-copy">{finished ? copy.finishedCopy : copy.introCopy}</p>
      </div>
      <div className="round-counter" aria-label={`${finished ? rounds.length : roundIndex + 1} ${isEnglish ? 'of' : 'de'} ${rounds.length} ${isEnglish ? 'decisions' : 'decisões'}`}>
        <span>{String(finished ? rounds.length : roundIndex + 1).padStart(2, '0')}</span>
        <i />
        <small>{String(rounds.length).padStart(2, '0')}<br />{copy.roundSummary}</small>
      </div>
    </div>
  )
}
