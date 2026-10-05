import { useState } from 'react'

const initialPolicyValues = {
  cleanEnergy: 35,
  efficiency: 30,
  transport: 25,
  forests: 35,
  methane: 25,
  fossilFuel: 20,
}
const baselineWarming = 3.3
const currentWarming = 1.3

export function usePolicyScenario(policyLevers, language) {
  const [policyValues, setPolicyValues] = useState(initialPolicyValues)
  const warmingReduction = policyLevers.reduce(
    (total, policy) => total + (policyValues[policy.key] / 100) * policy.warmingEffect,
    0,
  )
  const projectedWarming = Math.max(1.8, baselineWarming - warmingReduction)
  const emissionsIndex = Math.max(
    20,
    Math.round(
      100 - policyLevers.reduce(
        (total, policy) => total + (policyValues[policy.key] / 100) * policy.emissionsEffect,
        0,
      ),
    ),
  )
  const scenarioLabel = projectedWarming <= 2
    ? (language === 'en' ? 'Accelerated climate action' : 'Ação climática acelerada')
    : projectedWarming <= 2.6
      ? (language === 'en' ? 'Transition in progress' : 'Transição em andamento')
      : (language === 'en' ? 'The gap to the limit remains high' : 'A distância do limite segue alta')

  function updatePolicy(key, value) {
    setPolicyValues((current) => ({ ...current, [key]: Number(value) }))
  }

  function resetScenario() {
    setPolicyValues(initialPolicyValues)
  }

  return {
    policyValues,
    projectedWarming,
    emissionsIndex,
    scenarioLabel,
    baselineWarming,
    currentWarming,
    updatePolicy,
    resetScenario,
  }
}
