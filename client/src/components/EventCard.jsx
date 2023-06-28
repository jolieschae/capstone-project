import React, { useContext, useState } from 'react';
import { MyContext } from './MyProvider';
import './events.css';

function EventCard({ event }) {
  const { addRSVP } = useContext(MyContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleRSVPClick = () => {
    addRSVP(event.id);
  };

  return (
    <div className="eventCard" onClick={handleClick}>
      <div className="main">
        {!isClicked && <img className="thumbnail" src={event.thumbnail} alt="thumbnail" />}
        <h2 className="eventTitle">{event.title}</h2>
        <div className="subTitle">
          <div className="eventDate">
            <h3>{event.calendar.date}</h3>
          </div>
          <div className="ageRestriction">
            <h4>{event.age}</h4>
          </div>
        </div>
        <div className="eventInfo">
          <p style={{ display: isClicked ? 'block' : 'none' }} className="description">
            {isClicked ? event.description : ''}
          </p>
          <div className="ticketInfo">
            {event.tickets ? (
              <div style={{ display: isClicked ? 'block' : 'none' }} className="ticketButtonContainer">
                <a href={event.tickets}>
                  <button className="ticketButton">Tickets</button>
                </a>
              </div>
            ) : (
              <p style={{ display: isClicked ? 'block' : 'none' }} className="tickets">
                No tickets, just pull up!
              </p>
            )}
          </div>
          <p className="venue">
            <ins>◘</ins>
            {event.venue}
          </p>
          <p className="location">⟟ {event.location.neighborhood}</p>
        </div>
        <hr />
        <div className="artist">
          <p>
            {event.user} <ins className="artform">||</ins> {event.artform}
          </p>
        </div>
        <div className="addButtonDiv">
          <button className="addButton" onClick={handleRSVPClick}>
            RSVP
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
