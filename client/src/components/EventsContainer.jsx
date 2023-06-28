import React, { useContext, useEffect, useState } from 'react';
import EventCard from './EventCard';
import { MyContext } from './MyProvider';
import './events.css';
import './searchBar.css';

function EventsContainer() {
  const { eventsData } = useContext(MyContext);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const itemsPerPage = 6;

  useEffect(() => {
    setVisibleEvents(eventsData);
    setTotalPages(Math.ceil(eventsData.length / itemsPerPage));
    setCurrentPage(1);
  }, [eventsData]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const filteredEvents = visibleEvents.filter((event) => {
    const searchableFields = [
      event.title,
      event.category,
      event.subcategory,
      event.artform,
      event.artist,
      event.location.street,
      event.location.street2,
      event.location.city,
      event.location.state,
      event.location.zip,
      event.location.neighborhood,
      event.venue,
      event.calendar.time,
      event.calendar.date,
      event.calendar.day,
      event.price,
      event.tickets,
      event.share,
      ...(event.tags || []),
      ...(event.collaborators || []),
    ];
    return (
      searchableFields.some((field) => {
        if (typeof field === 'string') {
          return field.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (typeof field === 'object') {
          const values = Object.values(field);
          return values.some(
            (value) =>
              value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return false;
      }) &&
      (selectedCategory === '' || event.category === selectedCategory)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredEvents.length);
  const renderEventCards = filteredEvents
    .slice(startIndex, endIndex)
    .map((event) => <EventCard key={event.id} event={event} />);

  return (
    <div>
      <div className="searchBarBox">
        <form className="searchContainer">
          <div className="searchOuterCell">
            <div className="td">
              <input type="text" placeholder="Search events" onChange={handleSearch} />
            </div>
          </div>
        </form>
        <div className="categoryContainer">
          <span className="categoryLinks"
            id={selectedCategory === '' ? 'active' : ''}
            onClick={() => handleCategoryClick('')}
          >
            All
          </span>
          <span
            className="categoryLinks"
            id={selectedCategory === 'music' ? 'active' : ''}
            onClick={() => handleCategoryClick('music')}
          >
            Music
          </span>
          <span
            className="categoryLinks"
            id={selectedCategory === 'Dj' ? 'active' : ''}
            onClick={() => handleCategoryClick('Dj')}
          >
            Dj
          </span>
          <span
            className="categoryLinks"
            id={selectedCategory === 'photography' ? 'active' : ''}
            onClick={() => handleCategoryClick('photography')}
          >
            Photography
          </span>
          <span
            className="categoryLinks"
            id={selectedCategory === 'fashion' ? 'active' : ''}
            onClick={() => handleCategoryClick('fashion')}
          >
            Fashion
          </span>
          <span
            className="categoryLinks"
            id={selectedCategory === 'theater' ? 'active' : ''}
            onClick={() => handleCategoryClick('theater')}
          >
            Theater
          </span>
          <span
            className="categoryLinks"
            id={selectedCategory === 'visual arts' ? 'active' : ''}
            onClick={() => handleCategoryClick('visual arts')}
          >
            Visual Arts
          </span>
          <span
            className="categoryLinks"
            id={selectedCategory === 'film' ? 'active' : ''}
            onClick={() => handleCategoryClick('film')}
          >
            Film
          </span>
          <span
            className="categoryLinks"
            id={selectedCategory === 'comedy' ? 'active' : ''}
            onClick={() => handleCategoryClick('comedy')}
          >
            Comedy
          </span>
          </div>
        </div>

      <div className="eventContainer">{renderEventCards}</div>

      <div className="eventButtonContainer">
        {currentPage > 1 && (
          <button className="eventButton" onClick={handlePrevClick}>
            Prev
          </button>
        )}
        {currentPage < totalPages && (
          <button className="eventButton" onClick={handleNextClick}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default EventsContainer;
