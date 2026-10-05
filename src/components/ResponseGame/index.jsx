import { useResponseGame } from '../../hooks/useResponseGame'
import DecisionPanel from './DecisionPanel'
import HeatMap from './HeatMap'
import MissionIntroduction from './MissionIntroduction'
import MissionRail from './MissionRail'
import ResourcePanel from './ResourcePanel'

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

function ResponseGame({ language = 'en' }) {
  const rounds = roundsByLanguage[language] || roundsByLanguage.en
  const resourceInfo = resourceInfoByLanguage[language] || resourceInfoByLanguage.en
  const stepLabels = stepLabelsByLanguage[language] || stepLabelsByLanguage.en
  const copy = copyByLanguage[language] || copyByLanguage.en
  const game = useResponseGame(rounds)

  return (
    <div className="game-layout">
      <MissionRail rounds={rounds} roundIndex={game.roundIndex} finished={game.finished} language={language} copy={copy} stepLabels={stepLabels} />
      <section className="command-center" aria-live="polite">
        <MissionIntroduction round={game.round} roundIndex={game.roundIndex} rounds={rounds} finished={game.finished} outcome={game.outcome} language={language} copy={copy} />
        <HeatMap location={game.round.location} finished={game.finished} language={language} copy={copy} />
        <DecisionPanel
          round={game.round}
          finished={game.finished}
          outcome={game.outcome}
          resources={game.resources}
          resourceInfo={resourceInfo}
          onChoose={game.makeDecision}
          onRestart={game.restart}
          copy={copy}
        />
      </section>
      <ResourcePanel resources={game.resources} resourceInfo={resourceInfo} language={language} copy={copy} />
    </div>
  )
}

export default ResponseGame