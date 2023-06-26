import React, { useState } from "react";
import './events.css'

function EventCard({ event }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div className="eventCard" onClick={handleClick}>
      <div className='main'>
        {!isClicked && <img className='thumbnail' src={event.thumbnail} alt="thumbnail" />}
        <h2 className="eventTitle">{event.title}</h2>
        <h3 className="eventDate">{event.calendar.date}</h3>
        <h4 className="ageRestriction">{event.age}</h4>
        <div className='eventInfo'>
          <p style={{ display: isClicked ? 'block' : 'none' }} className="description">{isClicked ? event.description : ''}</p>
          <p style={{ display: isClicked ? 'block' : 'none' }} className="tickets">{isClicked ? event.tickets : ''}</p>
          <div className="venue">
            <p><ins>◘</ins>{event.venue}</p>
          </div>
          <div className="location">
          <p>⟟ {event.location.neighborhood}</p>
          </div>
        </div>
        <hr />
        <div className='artist'>
          {/* <div className='wrapper'>
            <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" alt="Creator" />
          </div> */}
          <p>{event.artist} <ins>|| {event.artform}</ins></p>
        </div>
      </div>
    </div>
  )
};

export default EventCard;
