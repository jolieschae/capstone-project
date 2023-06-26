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
        <div className="subTitle">
          <div className="eventDate">
            <h3>{event.calendar.date}</h3>
          </div>
          <div className="ageRestriction">
            <h4>{event.age}</h4>
          </div>
        </div>
        <div className='eventInfo'>
          <p style={{ display: isClicked ? 'block' : 'none' }} className="description">{isClicked ? event.description : ''}</p>
          <p style={{ display: isClicked ? 'block' : 'none' }} className="tickets">{isClicked ? event.tickets : ''}</p>
          <p className="venue"><ins>◘</ins>{event.venue}</p>
          <p className="location">⟟ {event.location.neighborhood}</p>
        </div>
        <hr />
        <div className='artist'>
          {/* <div className='wrapper'>
            <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" alt="Creator" />
          </div> */}
          <p>{event.user} <ins className="artform">|| {event.artform}</ins></p>
        </div>
      </div>
    </div>
  )
};

export default EventCard;
