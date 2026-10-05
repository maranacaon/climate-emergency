export default function MissionDebrief({ outcome, resources, resourceInfo, onRestart, copy }) {
  return (
    <div className="debrief-panel">
      <p>{outcome}</p>
      <div className="debrief-stats">{resourceInfo.map((resource) => <span key={resource.key}><b>{resources[resource.key]}%</b>{resource.label}</span>)}</div>
      <button className="restart-button" onClick={onRestart}><span aria-hidden="true">↻</span> {copy.resultLabel}</button>
    </div>
  )
}
