import React from 'react'
import EventsContainer from "./EventsContainer"
import Map from "./Map"
import './events.css'

function Events() {
  return (
    <div className="contentContainer">
      <div className="eventContainer"><EventsContainer /></div>
      <div className="mapContainer"><Map/></div>
    </div>
  )
}

export default Events