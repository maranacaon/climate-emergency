export default function MissionRail({ rounds, roundIndex, finished, language, copy, stepLabels }) {
  return (
    <aside className="mission-rail" aria-label={language === 'en' ? 'Mission progress' : 'Progresso da missão'}>
      <div className="rail-heading">{copy.railHeading}</div>
      <div className="rail-progress" aria-label={`${language === 'en' ? 'Round' : 'Turno'} ${Math.min(roundIndex + 1, rounds.length)} ${language === 'en' ? 'of' : 'de'} ${rounds.length}`}>
        {rounds.map((round, index) => (
          <div className={`rail-step ${index < roundIndex || finished ? 'done' : ''} ${index === roundIndex && !finished ? 'current' : ''}`} key={round.time}>
            <span className="rail-dot">{index < roundIndex || finished ? '✓' : `0${index + 1}`}</span>
            <span className="rail-step-label">{stepLabels[index]}</span>
          </div>
        ))}
      </div>
      <div className="rail-note">
        <span className="note-kicker">{copy.scenario}</span>
        <p>{copy.scenarioText}</p>
        <span className="note-temp">41°<small>C</small></span>
        <span className="note-caption">{copy.peakForecast}</span>
      </div>
      <div className="rail-footer">{copy.protocol}</div>
    </aside>
  )
}
