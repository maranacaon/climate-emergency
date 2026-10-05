export default function ChoiceList({ choices, onChoose }) {
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
