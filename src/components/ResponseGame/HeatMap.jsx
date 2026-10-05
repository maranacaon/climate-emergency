export default function HeatMap({ location, finished, language, copy }) {
  return (
    <div className="scene-panel">
      <img className="scene-image" src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1500&q=85" alt={language === 'en' ? 'Aerial view of a city under the sun' : 'Vista aérea de uma cidade sob o sol'} />
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
