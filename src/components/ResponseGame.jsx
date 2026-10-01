import { useState } from 'react'

const rounds = [
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
]

const initialResources = { health: 58, water: 62, power: 55, trust: 48 }
const resourceInfo = [
  { key: 'health', label: 'Saúde pública', color: 'coral' },
  { key: 'water', label: 'Reserva de água', color: 'blue' },
  { key: 'power', label: 'Rede elétrica', color: 'yellow' },
  { key: 'trust', label: 'Confiança', color: 'green' },
]
const stepLabels = ['Alerta', 'Energia', 'Água', 'Resposta']

function getOutcome(resources) {
  const average = Math.round(
    Object.values(resources).reduce((total, value) => total + value, 0) /
      resourceInfo.length,
  )
  if (average >= 66) return 'A cidade resistiu em rede.'
  if (average >= 42) return 'A resposta conteve os piores impactos.'
  return 'O calor venceu esta rodada. A cidade precisa se preparar melhor.'
}

function MissionRail({ rounds, roundIndex, finished }) {
  return (
    <aside className="mission-rail" aria-label="Progresso da missão">
      <div className="rail-heading">OPERAÇÃO<br />VERÃO EXTREMO</div>
      <div className="rail-progress" aria-label={`Turno ${Math.min(roundIndex + 1, rounds.length)} de ${rounds.length}`}>
        {rounds.map((round, index) => (
          <div className={`rail-step ${index < roundIndex || finished ? 'done' : ''} ${index === roundIndex && !finished ? 'current' : ''}`} key={round.time}>
            <span className="rail-dot">{index < roundIndex || finished ? '✓' : `0${index + 1}`}</span>
            <span className="rail-step-label">{stepLabels[index]}</span>
          </div>
        ))}
      </div>
      <div className="rail-note">
        <span className="note-kicker">CENÁRIO</span>
        <p>Onda de calor<br />na Região Sul</p>
        <span className="note-temp">41°<small>C</small></span>
        <span className="note-caption">PICO PREVISTO</span>
      </div>
      <div className="rail-footer">PROTOCOLO 07.24<br />DEFESA CIVIL · 2026</div>
    </aside>
  )
}

function MissionIntroduction({ round, roundIndex, rounds, finished, outcome }) {
  return (
    <div className="intro-row">
      <div>
        <div className="eyebrow"><span className="eyebrow-line" /> {finished ? 'MISSÃO ENCERRADA' : round.time}</div>
        <h1>{finished ? outcome : '48 horas para\nesfriar a cidade.'}</h1>
        <p className="intro-copy">{finished ? 'Cada escolha mudou a capacidade da cidade de proteger quem corre mais risco.' : 'Uma onda de calor extremo chegou. Você coordena a resposta: proteja vidas, administre recursos e mantenha a cidade funcionando.'}</p>
      </div>
      <div className="round-counter" aria-label={`${finished ? rounds.length : roundIndex + 1} de ${rounds.length} decisões`}>
        <span>{String(finished ? rounds.length : roundIndex + 1).padStart(2, '0')}</span>
        <i />
        <small>{String(rounds.length).padStart(2, '0')}<br />TURNOS</small>
      </div>
    </div>
  )
}

function HeatMap({ location, finished }) {
  return (
    <div className="scene-panel">
      <img
        className="scene-image"
        src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1500&q=85"
        alt="Vista aérea de uma cidade sob o sol"
      />
      <div className="scene-wash" />
      <div className="scene-topline"><span>MAPA DE CALOR URBANO</span><span>AO VIVO&nbsp; <i /></span></div>
      <div className="heat-legend"><span>INTENSIDADE</span><div><i /><i /><i /><i /><i /></div><small>BAIXA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CRÍTICA</small></div>
      <div className="map-marker marker-one"><span className="marker-pulse" /> <span>41°</span><small>04</small></div>
      <div className="map-marker marker-two"><span className="marker-pulse" /> <span>38°</span><small>08</small></div>
      <div className="scene-caption"><span className="caption-pin" />{finished ? 'REGIÃO METROPOLITANA' : location}</div>
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

function MissionDebrief({ outcome, resources, resourceInfo, onRestart }) {
  return (
    <div className="debrief-panel">
      <p>{outcome}</p>
      <div className="debrief-stats">{resourceInfo.map((resource) => <span key={resource.key}><b>{resources[resource.key]}%</b>{resource.label}</span>)}</div>
      <button className="restart-button" onClick={onRestart}><span aria-hidden="true">↻</span> JOGAR NOVAMENTE</button>
    </div>
  )
}

function DecisionPanel({ round, finished, outcome, resources, resourceInfo, onChoose, onRestart }) {
  return (
    <>
      <div className="decision-heading">
        <div><span className="decision-index">{finished ? 'FIM DA SIMULAÇÃO' : 'SITUAÇÃO ATUAL'}</span><h2>{finished ? 'Seu balanço de recursos' : round.title}</h2></div>
        {!finished && <span className="response-window">ESCOLHA UMA RESPOSTA <b>↘</b></span>}
      </div>
      {finished ? (
        <MissionDebrief outcome={outcome} resources={resources} resourceInfo={resourceInfo} onRestart={onRestart} />
      ) : (
        <>
          <p className="round-description">{round.description}</p>
          <ChoiceList choices={round.choices} onChoose={onChoose} />
        </>
      )}
    </>
  )
}

function ResourcePanel({ resources, resourceInfo }) {
  return (
    <aside className="resource-panel" aria-label="Indicadores da cidade">
      <div className="resource-header"><span>PAINEL DE CONTROLE</span><span className="resource-menu" aria-hidden="true">···</span></div>
      <p className="resource-subhead">CAPACIDADE DE RESPOSTA</p>
      <div className="resource-list">
        {resourceInfo.map((resource) => (
          <div className="resource-item" key={resource.key}>
            <div className="resource-label"><span className={`resource-swatch ${resource.color}`} /><span>{resource.label}</span><strong>{resources[resource.key]}<small>%</small></strong></div>
            <div className="resource-track" role="progressbar" aria-label={resource.label} aria-valuenow={resources[resource.key]} aria-valuemin="0" aria-valuemax="100"><span className={resource.color} style={{ width: `${resources[resource.key]}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="panel-divider" />
      <div className="briefing-label"><span className="briefing-icon">i</span> BOLETIM DE CAMPO</div>
      <p className="briefing-copy">As decisões afetam os indicadores de forma diferente. Nenhum recurso é infinito: encontre o equilíbrio entre urgência e cuidado contínuo.</p>
      <div className="briefing-source">CENTRO DE OPERAÇÕES<br />ATUALIZADO AGORA</div>
      <div className="resource-bottom"><span className="bottom-dot" /> CONEXÃO ESTÁVEL <span>●</span></div>
    </aside>
  )
}

function ResponseGame() {
  const [roundIndex, setRoundIndex] = useState(0)
  const [resources, setResources] = useState(initialResources)
  const [finished, setFinished] = useState(false)
  const round = rounds[roundIndex]
  const outcome = getOutcome(resources)

  function makeDecision(impact) {
    setResources((current) =>
      Object.fromEntries(
        Object.entries(current).map(([key, value]) => [
          key,
          Math.max(0, Math.min(100, value + impact[key])),
        ]),
      ),
    )
    if (roundIndex === rounds.length - 1) setFinished(true)
    else setRoundIndex((index) => index + 1)
  }

  function restart() {
    setRoundIndex(0)
    setResources(initialResources)
    setFinished(false)
  }

  return (
    <div className="game-layout">
      <MissionRail rounds={rounds} roundIndex={roundIndex} finished={finished} />
      <section className="command-center" aria-live="polite">
        <MissionIntroduction round={round} roundIndex={roundIndex} rounds={rounds} finished={finished} outcome={outcome} />
        <HeatMap location={round.location} finished={finished} />
        <DecisionPanel
          round={round}
          finished={finished}
          outcome={outcome}
          resources={resources}
          resourceInfo={resourceInfo}
          onChoose={makeDecision}
          onRestart={restart}
        />
      </section>
      <ResourcePanel resources={resources} resourceInfo={resourceInfo} />
    </div>
  )
}

export default ResponseGame