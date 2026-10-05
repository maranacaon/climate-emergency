import { useState } from 'react'

const initialResources = { health: 58, water: 62, power: 55, trust: 48 }

function clampResource(value) {
  return Math.max(0, Math.min(100, value))
}

function getOutcome(resources) {
  const average = Math.round(
    Object.values(resources).reduce((total, value) => total + value, 0) /
      Object.keys(resources).length,
  )
  if (average >= 66) return 'The city held together.'
  if (average >= 42) return 'The response contained the worst impacts.'
  return 'The heat won this round. The city needs to prepare better.'
}

export function useResponseGame(rounds) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [resources, setResources] = useState(initialResources)
  const [finished, setFinished] = useState(false)

  function makeDecision(impact) {
    setResources((current) =>
      Object.fromEntries(
        Object.entries(current).map(([key, value]) => [
          key,
          clampResource(value + impact[key]),
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

  return {
    round: rounds[roundIndex],
    roundIndex,
    resources,
    finished,
    outcome: getOutcome(resources),
    makeDecision,
    restart,
  }
}
