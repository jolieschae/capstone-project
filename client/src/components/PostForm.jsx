import React, { useState } from 'react';
import "./contribute.css"

function PostForm() {
  const [postType, setPostType] = useState('');

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const renderForm = () => {
    switch (postType) {
      case 'event':
        return renderEventForm();
      case 'blog':
        return renderBlogForm();
      case 'gig':
        return renderGigForm();
      default:
        return null;
    }
  };

  const renderEventForm = () => {
    return (


      <div className="formWrapper">
      <div className="gigFormContainer">
      <div className="formContainersWrapper">
      <div className="leftContainer">
        <h1 className="formType">
          EVENTS
        </h1>
      </div>
      <div className="rightContainer">
          <h1 className="formTitle"> give us the scoop...</h1>
          <div className="set">
            <div className="formTitleBox">
              <label className="postFormLabel" htmlFor="pets-name">Title</label>
              <input
              className="postFormInput"
                type="text"
                id="postTitle"
                placeholder="Name your event"
              />
            </div>
            <div className="thumbnail">
              <button className="thumbnailUpload">
               +
              </button>
              <label 
              className="postFormLabel"
              id="thumbnailPrompt"
              > Upload a thumbnail for your event. <span className="postFormDisclaimer">Please follow community guidelines.</span></label>
            </div>
          </div>
          <div className="set">
            <div className="formTime">
              <label className="postFormLabel">Time</label>
              <input
                className="postFormInput"
                type="text"
                id="eventTime"
                placeholder="Time"
              />
            </div>
            <div className="formDate">
              <label className="postFormLabel">Date</label>
              <input
                className="postFormInput"
                type="text"
                id="eventDate"
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div className="formCategoryBox">
              <label htmlFor="category">File Under:</label>
              <input
                className="postFormInput"
                type="text"
                id="category"
                placeholder="Category"
              />
              <input
                className="postFormInput"
                type="text"
                id="subcategory"
                placeholder="Subcategories"
              />
            </div>
          </div>
          <div className="set">
            <div className="formLocationBox">
              <label htmlFor="location">Location</label>
              <input
                className="postFormInput"
                type="text"
                id="state"
                placeholder="State"
              />
              <input
                className="postFormInput"
                type="text"
                id="city"
                placeholder="City"
              />
              <input
                className="postFormInput"
                type="text"
                id="street"
                placeholder="Street"
              />
              <input
                className="postFormInput"
                type="text"
                id="zip"
                placeholder="ZIP"
              />
            </div>
            <div className="formVenue">
              <label className="postFormLabel">Venue</label>
              <input
                className="postFormInput"
                type="text"
                id="eventVenue"
                placeholder="Venue name"
              />
            </div>
          </div>
          <div className="set">
          <div className="formRestrictions">
            <label htmlFor="ageRestrictions">Age Restrictions?</label>
            <div className="radio-container">
              <input 
                className="postFormInput"
                type="radio"
                id="allAges"
                name="allAges"
                value="All Ages"
                checked
              />
              <label htmlFor="allAges">All Ages</label>
              <input
                className="postFormInput"
                type="radio"
                id="18"
                name="18"
                value="18"
              />
              <label htmlFor="18">18+</label>
              <input
                className="postFormInput"
                type="radio"
                id="21"
                name="21"
                value="21"
              />
              <label htmlFor="21">21+</label>
            </div>
          </div>
          </div>
        <footer>
          <div className="set">
            <button id="back">Back</button>
            <button id="next">Next</button>
          </div>
        </footer>
      </div>
      </div>
    </div>
    </div>

      // <div className="eventFormContainer">
      //   <h2 className="eventFormTitle">Event Form</h2>
      //   <label className="eventFormLabel">
      //     Title of Event:
      //     <input className="eventFormInput"type="text" name="title" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Host:
      //     <input className="eventFormInput" type="text" name="host" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Date:
      //     <input className="eventFormInput" type="date" name="date" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Day of Week:
      //     <input className="eventFormInput" type="text" name="dayOfWeek" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Time:
      //     <input className="eventFormInput" type="text" name="time" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Category:
      //     <select className="eventFormSelect" name="category">
      //       <option className="eventFormOption" value="music">Music</option>
      //       <option className="eventFormOption" value="photography">Photography</option>
      //       <option className="eventFormOption" value="visual-arts">Visual Arts</option>
      //     </select>
      //   </label>
      //   <label className="eventFormLabel">
      //     Collaborators:
      //     <input className="eventFormInput" type="text" name="collaborator1" />
      //     <input className="eventFormInput" type="text" name="collaborator2" />
      //     <input className="eventFormInput" type="text" name="collaborator3" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Location:
      //     <input className="eventFormInput" type="text" name="state" placeholder="State" />
      //     <input className="eventFormInput" type="text" name="city" placeholder="City" />
      //     <input className="eventFormInput" type="text" name="street" placeholder="Street" />
      //     <input className="eventFormInput" type="text" name="zipCode" placeholder="Zip Code" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Venue:
      //     <input className="eventFormInput" type="text" name="venue" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Ticket Link:
      //     <input className="eventFormInput" type="text" name="ticketLink" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Price:
      //     <input className="eventFormInput" type="text" name="price" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Age Restriction:
      //     <input className="eventFormInput" type="text" name="ageRestriction" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Description:
      //     <textarea className="eventFormText" name="description"></textarea>
      //   </label>
      //   <label className="eventFormLabel">
      //     Subcategories:
      //     <input className="eventFormInput" type="text" name="subcategories" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Tags:
      //     <input className="eventFormInput" type="text" name="tags" />
      //   </label>
      //   <label className="eventFormLabel">
      //     Thumbnail:
      //     <input className="eventFormInput" type="file" name="thumbnail" />
      //   </label>
      //   <button className="eventFormSubmit" type="submit">Submit</button>
      // </div>
    );
  };

  const renderBlogForm = () => {
    return (
      <div className="eventFormContainer">
        <h2 className="eventFormContainer">Blog Form</h2>
        <label className="eventFormContainer">
          Author:
          <input className="eventFormContainer" type="text" name="author" />
        </label>
        <label className="eventFormContainer">
          Title:
          <input className="eventFormContainer" type="text" name="title" />
        </label>
        <label className="eventFormContainer">
          Subtitle:
          <input className="eventFormContainer" type="text" name="subtitle" />
        </label>
        <label className="eventFormContainer">
          Body:
          <textarea className="eventFormContainer" name="body"></textarea>
        </label>
        <label className="eventFormContainer">
          Category:
          <select className="eventFormContainer" name="category">
            <option className="eventFormContainer" value="music">Music</option>
            <option className="eventFormContainer" value="photography">Photography</option>
            <option className="eventFormContainer" value="visual-arts">Visual Arts</option>
          </select>
        </label>
        <label className="eventFormContainer">
          Tags:
          <input className="eventFormContainer" type="text" name="tags" />
        </label>
        <button className="eventFormContainer" type="submit">Submit</button>
      </div>
    );
  };

  const renderGigForm = () => {
    return (
      <div>
        <h2>Gig Form</h2>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Role:
          <input type="text" name="role" />
        </label>
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <label>
          Job Dates:
          <input type="text" name="jobDates" />
        </label>
        <label>
          Compensation:
          <input type="text" name="compensation" />
        </label>
        <label>
          Category:
          <select name="category">
            <option value="music">Music</option>
            <option value="photography">Photography</option>
            <option value="visual-arts">Visual Arts</option>
          </select>
        </label>
        <label>
          Tags:
          <input type="text" name="tags" />
        </label>
        <button type="submit">Submit</button>
      </div>
    );
  };

  return (
    <div>
      <h1>Post Form</h1>
      <label>
        Select post type:
        <select value={postType} onChange={handlePostTypeChange}>
          <option value="">Select</option>
          <option value="event">Event</option>
          <option value="blog">Blog</option>
          <option value="gig">Gig</option>
        </select>
      </label>

      {renderForm()}
    </div>
  );
}

export default PostForm;


