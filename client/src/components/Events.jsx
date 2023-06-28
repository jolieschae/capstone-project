import React, { useContext } from 'react';
import EventsContainer from './EventsContainer';
import Map from './Map';
import { MyContext } from './MyProvider';
import './events.css';

function Events() {
  const { eventsData } = useContext(MyContext);

  return (
    <div className="contentContainer">
      <EventsContainer eventsData={eventsData} />
      <Map eventsData={eventsData} />
    </div>
  );
}

export default Events;