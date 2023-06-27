import React from 'react'
import EventsContainer from "./EventsContainer"
import Map from "./Map"
import './events.css'

function Events() {
  return (
    <div className="contentContainer">
      <EventsContainer />
      <Map/>
    </div>
  )
}

export default Events