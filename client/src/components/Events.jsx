import React, { useContext } from 'react';
import EventsContainer from './EventsContainer';
import EventMap from './EventMap';
import { MyContext } from './MyProvider';
import './events.css';

function Events() {
  const { eventsData } = useContext(MyContext);

  return (
    <div className="contentContainer">
      <EventsContainer eventsData={eventsData} />
      <EventMap eventsData={eventsData} />
    </div>
  );
}

export default Events;