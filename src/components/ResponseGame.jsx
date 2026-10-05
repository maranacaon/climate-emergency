import { useResponseGame } from '../hooks/useResponseGame'

const roundsByLanguage = {
  en: [
    {
      time: 'DAY 01 · 09:00',
      title: 'Heat arrived before the rain.',
      description: 'Forecast calls for 41°C by the end of the day. The densest neighborhoods are already 6 degrees hotter than the city average.',
      location: 'Downtown · District 04',
      choices: [
        { title: 'Open schools as climate shelters', detail: 'Cool water, shade, and support for those who need it most.', impact: { health: 16, water: -8, power: -4, trust: 12 }, tag: 'IMMEDIATE PROTECTION' },
        { title: 'Issue alerts and send outreach teams', detail: 'Reach older adults, isolated residents, and workers first.', impact: { health: 10, water: -3, power: 0, trust: 8 }, tag: 'ACTIVE SEARCH' },
        { title: 'Ration electricity to prevent outages', detail: 'Preserve the grid during peak hours.', impact: { health: -5, water: 0, power: 15, trust: -4 }, tag: 'GRID STABILITY' },
      ],
    },
    {
      time: 'DAY 01 · 15:30',
      title: 'The power grid is at its limit.',
      description: 'Air conditioning and hospitals compete for electricity. In Morro da Linha, homes without insulation already exceed 38°C.',
      location: 'Morro da Linha · District 08',
      choices: [
        { title: 'Prioritize hospitals and public transit', detail: 'Redirect critical energy and keep buses cool.', impact: { health: 13, water: 0, power: -10, trust: 6 }, tag: 'ESSENTIAL SERVICES' },
        { title: 'Install cooling points', detail: 'Use community centers with ventilation and safe drinking water.', impact: { health: 10, water: -7, power: -5, trust: 10 }, tag: 'COOL REFUGES' },
        { title: 'Reduce commercial lighting', detail: 'Lower demand on the grid for a few hours.', impact: { health: -3, water: 0, power: 12, trust: -2 }, tag: 'ENERGY SAVINGS' },
      ],
    },
    {
      time: 'DAY 02 · 07:00',
      title: 'Water is now the priority.',
      description: 'The reservoir is at 34%. A main pipe burst overnight and three neighborhoods woke up with low pressure.',
      location: 'Vila das Águas · District 02',
      choices: [
        { title: 'Distribute water with tanker trucks', detail: 'Deliver supply directly to the most affected areas.', impact: { health: 12, water: -14, power: -2, trust: 12 }, tag: 'SUPPLY' },
        { title: 'Repair the pipeline under emergency conditions', detail: 'Mobilize crews to restore the main network.', impact: { health: 5, water: 10, power: -4, trust: 6 }, tag: 'INFRASTRUCTURE' },
        { title: 'Limit non-essential consumption', detail: 'Request temporary reductions in commerce and gardens.', impact: { health: -3, water: 12, power: 0, trust: -5 }, tag: 'CONSCIOUS USE' },
      ],
    },
    {
      time: 'DAY 02 · 16:00',
      title: 'The heat wave has not eased yet.',
      description: 'Temperatures remain high and the team must decide how to maintain protection over the next 24 hours.',
      location: 'Entire city · Continuous operation',
      choices: [
        { title: 'Keep shelters open overnight', detail: 'Ensure rest and support until temperatures cool down.', impact: { health: 12, water: -5, power: -5, trust: 9 }, tag: 'CONTINUOUS CARE' },
        { title: 'Reinforce neighborhood communication', detail: 'Coordinate local alerts, radio updates, and community agents.', impact: { health: 6, water: 0, power: 0, trust: 14 }, tag: 'PUBLIC INFORMATION' },
        { title: 'Focus teams on critical hotspots', detail: 'Direct resources toward those at highest risk of illness.', impact: { health: 10, water: -2, power: -2, trust: 3 }, tag: 'TARGETED RESPONSE' },
      ],
    },
  ],
  pt: [
    {
      time: 'DIA 01 · 09:00',
      title: 'O calor chegou antes da chuva.',
      description: 'A previsão marca 41 °C até o fim do dia. Os bairros mais densos já estão 6 graus mais quentes que a média da cidade.',
      location: 'Centro · Distrito 04',
      choices: [
        { title: 'Abrir escolas como abrigos climáticos', detail: 'Água fresca, sombra e atendimento para quem mais precisa.', impact: { health: 16, water: -8, power: -4, trust: 12 }, tag: 'PROTEÇÃO IMEDIATA' },
        { title: 'Enviar alerta e equipes de rua', detail: 'Chegar primeiro a idosos, pessoas sozinhas e trabalhadores.', impact: { health: 10, water: -3, power: 0, trust: 8 }, tag: 'BUSCA ATIVA' },
        { title: 'Racionar energia para evitar apagões', detail: 'Preservar a rede elétrica nos horários de pico.', impact: { health: -5, water: 0, power: 15, trust: -4 }, tag: 'REDE ELÉTRICA' },
      ],
    },
    {
      time: 'DIA 01 · 15:30',
      title: 'A rede elétrica está no limite.',
      description: 'Ar-condicionado e hospitais disputam energia. No Morro da Linha, as casas sem isolamento já passam dos 38 °C.',
      location: 'Morro da Linha · Distrito 08',
      choices: [
        { title: 'Priorizar hospitais e transporte público', detail: 'Redirecionar energia crítica e manter ônibus refrigerados.', impact: { health: 13, water: 0, power: -10, trust: 6 }, tag: 'SERVIÇOS ESSENCIAIS' },
        { title: 'Instalar pontos de resfriamento', detail: 'Usar centros comunitários com ventilação e água potável.', impact: { health: 10, water: -7, power: -5, trust: 10 }, tag: 'REFÚGIOS FRESCOS' },
        { title: 'Reduzir iluminação comercial', detail: 'Baixar a demanda da rede por algumas horas.', impact: { health: -3, water: 0, power: 12, trust: -2 }, tag: 'ECONOMIA DE ENERGIA' },
      ],
    },
    {
      time: 'DIA 02 · 07:00',
      title: 'A água virou prioridade.',
      description: 'O reservatório está em 34%. Uma adutora rompeu durante a noite e três bairros amanheceram com baixa pressão.',
      location: 'Vila das Águas · Distrito 02',
      choices: [
        { title: 'Distribuir água com caminhões-pipa', detail: 'Levar abastecimento direto às áreas mais afetadas.', impact: { health: 12, water: -14, power: -2, trust: 12 }, tag: 'ABASTECIMENTO' },
        { title: 'Consertar a adutora em regime de urgência', detail: 'Mobilizar equipes para restaurar a rede principal.', impact: { health: 5, water: 10, power: -4, trust: 6 }, tag: 'INFRAESTRUTURA' },
        { title: 'Restringir o consumo não essencial', detail: 'Pedir redução temporária em comércios e jardins.', impact: { health: -3, water: 12, power: 0, trust: -5 }, tag: 'USO CONSCIENTE' },
      ],
    },
    {
      time: 'DIA 02 · 16:00',
      title: 'A onda de calor ainda não cedeu.',
      description: 'A temperatura segue alta e a equipe precisa decidir como manter a proteção nas próximas 24 horas.',
      location: 'Toda a cidade · Operação contínua',
      choices: [
        { title: 'Manter abrigos abertos durante a noite', detail: 'Garantir descanso e atendimento até a queda da temperatura.', impact: { health: 12, water: -5, power: -5, trust: 9 }, tag: 'CUIDADO CONTÍNUO' },
        { title: 'Reforçar comunicação nos bairros', detail: 'Combinar avisos locais, rádio e agentes comunitários.', impact: { health: 6, water: 0, power: 0, trust: 14 }, tag: 'INFORMAÇÃO PÚBLICA' },
        { title: 'Concentrar equipes nos pontos críticos', detail: 'Direcionar recursos a quem corre maior risco de adoecer.', impact: { health: 10, water: -2, power: -2, trust: 3 }, tag: 'RESPOSTA DIRECIONADA' },
      ],
    },
  ],
}

const resourceInfoByLanguage = {
  en: [
    { key: 'health', label: 'Public health', color: 'coral' },
    { key: 'water', label: 'Water reserve', color: 'blue' },
    { key: 'power', label: 'Power grid', color: 'yellow' },
    { key: 'trust', label: 'Trust', color: 'green' },
  ],
  pt: [
    { key: 'health', label: 'Saúde pública', color: 'coral' },
    { key: 'water', label: 'Reserva de água', color: 'blue' },
    { key: 'power', label: 'Rede elétrica', color: 'yellow' },
    { key: 'trust', label: 'Confiança', color: 'green' },
  ],
}
const stepLabelsByLanguage = { en: ['Alert', 'Power', 'Water', 'Response'], pt: ['Alerta', 'Energia', 'Água', 'Resposta'] }
const copyByLanguage = {
  en: {
    railHeading: 'EXTREME SUMMER\nOPERATION',
    scenario: 'SCENARIO',
    scenarioText: 'Heat wave\nin the South Region',
    peakForecast: 'PEAK FORECAST',
    protocol: 'PROTOCOL 07.24\nCIVIL DEFENSE · 2026',
    missionClosed: 'MISSION COMPLETE',
    introText: '48 hours to cool the city.',
    introCopy: 'A severe heat wave has arrived. You coordinate the response: protect lives, manage resources, and keep the city functioning.',
    finishedCopy: 'Every decision changed the city’s ability to protect those at greatest risk.',
    endSimulation: 'END OF SIMULATION',
    currentSituation: 'CURRENT SITUATION',
    resourceBalance: 'Your resource balance',
    chooseResponse: 'CHOOSE A RESPONSE',
    resultLabel: 'PLAY AGAIN',
    cityIndicators: 'CITY INDICATORS',
    responseCapacity: 'RESPONSE CAPACITY',
    briefing: 'FIELD BRIEFING',
    briefingCopy: 'Every decision affects each indicator differently. No resource is infinite: balance urgency with ongoing care.',
    operations: 'OPERATIONS CENTER\nUPDATED NOW',
    connection: 'STABLE CONNECTION',
    mapLabel: 'URBAN HEAT MAP',
    live: 'LIVE',
    intensity: 'INTENSITY',
    low: 'LOW',
    critical: 'CRITICAL',
    metro: 'METROPOLITAN REGION',
    roundSummary: 'Turns',
    decisionCount: 'decisions',
  },
  pt: {
    railHeading: 'OPERAÇÃO\nVERÃO EXTREMO',
    scenario: 'CENÁRIO',
    scenarioText: 'Onda de calor\nna Região Sul',
    peakForecast: 'PICO PREVISTO',
    protocol: 'PROTOCOLO 07.24\nDEFESA CIVIL · 2026',
    missionClosed: 'MISSÃO ENCERRADA',
    introText: '48 horas para\nesfriar a cidade.',
    introCopy: 'Uma onda de calor extremo chegou. Você coordena a resposta: proteja vidas, administre recursos e mantenha a cidade funcionando.',
    finishedCopy: 'Cada escolha mudou a capacidade da cidade de proteger quem corre mais risco.',
    endSimulation: 'FIM DA SIMULAÇÃO',
    currentSituation: 'SITUAÇÃO ATUAL',
    resourceBalance: 'Seu balanço de recursos',
    chooseResponse: 'ESCOLHA UMA RESPOSTA',
    resultLabel: 'JOGAR NOVAMENTE',
    cityIndicators: 'INDICADORES DA CIDADE',
    responseCapacity: 'CAPACIDADE DE RESPOSTA',
    briefing: 'BOLETIM DE CAMPO',
    briefingCopy: 'As decisões afetam os indicadores de forma diferente. Nenhum recurso é infinito: encontre o equilíbrio entre urgência e cuidado contínuo.',
    operations: 'CENTRO DE OPERAÇÕES\nATUALIZADO AGORA',
    connection: 'CONEXÃO ESTÁVEL',
    mapLabel: 'URBAN HEAT MAP',
    live: 'LIVE',
    intensity: 'INTENSIDADE',
    low: 'BAIXA',
    critical: 'CRÍTICA',
    metro: 'REGIÃO METROPOLITANA',
    roundSummary: 'TURNOS',
    decisionCount: 'decisões',
  },
}

function MissionRail({ rounds, roundIndex, finished, language }) {
  const stepLabels = stepLabelsByLanguage[language] || stepLabelsByLanguage.en
  const copy = copyByLanguage[language] || copyByLanguage.en

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

function MissionIntroduction({ round, roundIndex, rounds, finished, outcome, language }) {
  const copy = copyByLanguage[language] || copyByLanguage.en
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

function HeatMap({ location, finished, language }) {
  const copy = copyByLanguage[language] || copyByLanguage.en

  return (
    <div className="scene-panel">
      <img
        className="scene-image"
        src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1500&q=85"
        alt={language === 'en' ? 'Aerial view of a city under the sun' : 'Vista aérea de uma cidade sob o sol'}
      />
      <div className="scene-wash" />
      <div className="scene-topline"><span>{copy.mapLabel}</span><span>{copy.live}&nbsp; <i /></span></div>
      <div className="heat-legend"><span>{copy.intensity}</span><div><i /><i /><i /><i /><i /></div><small>{copy.low}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {copy.critical}</small></div>
      <div className="map-marker marker-one"><span className="marker-pulse" /> <span>41°</span><small>04</small></div>
      <div className="map-marker marker-two"><span className="marker-pulse" /> <span>38°</span><small>08</small></div>
      <div className="scene-caption"><span className="caption-pin" />{finished ? copy.metro : location}</div>
      <div className="scene-coordinates">23°32&apos; S&nbsp; 46°38&apos; W</div>
    </div>
  )
}

function ChoiceList({ choices, onChoose }) {
  return (
    <div className="choice-list">
      {choices.map((choice, index) => (
        <button className="choice-button" key={choice.title} onClick={() => onChoose(choice.impact)}>
          <span className="choice-number">0{index + 1}</span>
          <span className="choice-copy"><span className="choice-tag">{choice.tag}</span><strong>{choice.title}</strong><small>{choice.detail}</small></span>
          <span className="choice-arrow" aria-hidden="true">↗</span>
        </button>
      ))}
    </div>
  )
}

function MissionDebrief({ outcome, resources, resourceInfo, onRestart, language }) {
  const copy = copyByLanguage[language] || copyByLanguage.en

  return (
    <div className="debrief-panel">
      <p>{outcome}</p>
      <div className="debrief-stats">{resourceInfo.map((resource) => <span key={resource.key}><b>{resources[resource.key]}%</b>{resource.label}</span>)}</div>
      <button className="restart-button" onClick={onRestart}><span aria-hidden="true">↻</span> {copy.resultLabel}</button>
    </div>
  )
}

function DecisionPanel({ round, finished, outcome, resources, resourceInfo, onChoose, onRestart, language }) {
  const copy = copyByLanguage[language] || copyByLanguage.en

  return (
    <>
      <div className="decision-heading">
        <div><span className="decision-index">{finished ? copy.endSimulation : copy.currentSituation}</span><h2>{finished ? copy.resourceBalance : round.title}</h2></div>
        {!finished && <span className="response-window">{copy.chooseResponse} <b>↘</b></span>}
      </div>
      {finished ? (
        <MissionDebrief outcome={outcome} resources={resources} resourceInfo={resourceInfo} onRestart={onRestart} language={language} />
      ) : (
        <>
          <p className="round-description">{round.description}</p>
          <ChoiceList choices={round.choices} onChoose={onChoose} />
        </>
      )}
    </>
  )
}

function ResourcePanel({ resources, resourceInfo, language }) {
  const copy = copyByLanguage[language] || copyByLanguage.en

  return (
    <aside className="resource-panel" aria-label={copy.cityIndicators}>
      <div className="resource-header"><span>{language === 'en' ? 'CONTROL PANEL' : 'PAINEL DE CONTROLE'}</span><span className="resource-menu" aria-hidden="true">···</span></div>
      <p className="resource-subhead">{copy.responseCapacity}</p>
      <div className="resource-list">
        {resourceInfo.map((resource) => (
          <div className="resource-item" key={resource.key}>
            <div className="resource-label"><span className={`resource-swatch ${resource.color}`} /><span>{resource.label}</span><strong>{resources[resource.key]}<small>%</small></strong></div>
            <div className="resource-track" role="progressbar" aria-label={resource.label} aria-valuenow={resources[resource.key]} aria-valuemin="0" aria-valuemax="100"><span className={resource.color} style={{ width: `${resources[resource.key]}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="panel-divider" />
      <div className="briefing-label"><span className="briefing-icon">i</span> {copy.briefing}</div>
      <p className="briefing-copy">{copy.briefingCopy}</p>
      <div className="briefing-source">{copy.operations}</div>
      <div className="resource-bottom"><span className="bottom-dot" /> {copy.connection} <span>●</span></div>
    </aside>
  )
}

function ResponseGame({ language = 'en' }) {
  const rounds = roundsByLanguage[language] || roundsByLanguage.en
  const resourceInfo = resourceInfoByLanguage[language] || resourceInfoByLanguage.en
  const game = useResponseGame(rounds)

  return (
    <div className="game-layout">
      <MissionRail rounds={rounds} roundIndex={game.roundIndex} finished={game.finished} language={language} />
      <section className="command-center" aria-live="polite">
        <MissionIntroduction round={game.round} roundIndex={game.roundIndex} rounds={rounds} finished={game.finished} outcome={game.outcome} language={language} />
        <HeatMap location={game.round.location} finished={game.finished} language={language} />
        <DecisionPanel
          round={game.round}
          finished={game.finished}
          outcome={game.outcome}
          resources={game.resources}
          resourceInfo={resourceInfo}
          onChoose={game.makeDecision}
          onRestart={game.restart}
          language={language}
        />
      </section>
      <ResourcePanel resources={game.resources} resourceInfo={resourceInfo} language={language} />
    </div>
  )
}

export default ResponseGame