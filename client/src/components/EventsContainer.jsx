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

  useEffect(() => {
    const filteredEvents = eventsData.filter((event) => {
      const isMatchingCategory =
        selectedCategory === '' || event.category === selectedCategory;

      const isMatchingSubcategory =
      selectedCategory === '' || event.subcategory === selectedCategory;

      if (searchTerm === '') {
        return isMatchingCategory || isMatchingSubcategory;
      }

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
        (isMatchingCategory || isMatchingSubcategory) &&
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
        })
      );
    });

    setVisibleEvents(filteredEvents);
    setTotalPages(Math.ceil(filteredEvents.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryClick = (value) => {
    setSelectedCategory(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, visibleEvents.length);
  const renderEventCards = visibleEvents
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
  <select value={selectedCategory} onChange={(e) => handleCategoryClick(e.target.value)}>
    <option value="">All</option>
    <option value="Music">Music</option>
    <option value="DJ">DJs</option>
    <option value="Photography">Photography</option>
    <option value="Fashion & Textiles">Fashion</option>
    <option value="Theater">Theater</option>
    <option value="Visual Arts">Visual Arts</option>
    <option value="Film">Film</option>
    <option value="Comedy">Comedy</option>
  </select>
</div>
      </div>

      <div className="eventContainerWrapper">
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
    </div>
  );
}

export default EventsContainer;
