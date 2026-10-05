export default function ResourcePanel({ resources, resourceInfo, copy, language }) {
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
