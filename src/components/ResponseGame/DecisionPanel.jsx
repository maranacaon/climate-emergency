import ChoiceList from './ChoiceList'
import MissionDebrief from './MissionDebrief'

export default function DecisionPanel({ round, finished, outcome, resources, resourceInfo, onChoose, onRestart, copy }) {
  return (
    <>
      <div className="decision-heading">
        <div><span className="decision-index">{finished ? copy.endSimulation : copy.currentSituation}</span><h2>{finished ? copy.resourceBalance : round.title}</h2></div>
        {!finished && <span className="response-window">{copy.chooseResponse} <b>↘</b></span>}
      </div>
      {finished ? (
        <MissionDebrief outcome={outcome} resources={resources} resourceInfo={resourceInfo} onRestart={onRestart} copy={copy} />
      ) : (
        <>
          <p className="round-description">{round.description}</p>
          <ChoiceList choices={round.choices} onChoose={onChoose} />
        </>
      )}
    </>
  )
}
