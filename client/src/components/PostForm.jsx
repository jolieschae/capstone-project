import React, { useState } from 'react';
import "./contribute.css"

function PostForm() {

  const [postType, setPostType] = useState('');
  const [ageRestriction, setAgeRestriction] = useState('allAges');
    
      const handleAgeRestrictionChange = (event) => {
        setAgeRestriction(event.target.value);
      };

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
      <div className="formContainer">
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
              <select className="eventFormSelectCategory" name="category"
              placeholder="Category">
              <option className="categoryOption" value="Music">Music</option>
              <option className="categoryOption"
              value="DJ">DJs</option>
              <option className="categoryOption"
              value="Photography">Photography</option>
              <option className="categoryOption"
              value="Fashion & Textiles">Fashion</option>
              <option className="categoryOption"
              value="Theater">Theater</option>
              <option className="categoryOption"
              value="Visual Arts">Visual Arts</option>
              <option value="Film">Film</option>
              <option value="Comedy">Comedy</option>
              </select>
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
            <div className="formCollaborators">
            <label className="eventFormLabel"> Collaborators? Give 'em a shout
           <input className="eventFormInput" type="text" name="collaborator1" />
            <input className="eventFormInput" type="text" name="collaborator2" />
           <input className="eventFormInput" type="text" name="collaborator3" />
         </label>
            </div>
          </div>
          <div className="set">
            <div className="formDescription">
              <label htmlFor="description">Description</label>
            <textarea className="eventFormDescriptionBox" name="description"></textarea>
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
                value="allAges"
                checked={ageRestriction === 'allAges'}
            onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="allAges">All Ages</label>
              <input
                className="postFormInput"
                type="radio"
                id="18"
                name="18"
                value="18"
                checked={ageRestriction === '18'}
              onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="18">18+</label>
              <input
                className="postFormInput"
                type="radio"
                id="21"
                name="21"
                value="21"
                checked={ageRestriction === '21'}
              onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="21">21+</label>
            </div>
          </div>
          </div>
          <div className="set">
            <div className="formTickets">
              <label htmlFor="tickets">Link to Tickets:</label>
              <input
                className="postFormInput"
                type="text"
                id="eventTickets"
                placeholder="Ticket Link"
              />
            </div>
          </div>
        <footer>
          <div className="submit">
            <button className="postSubmitButton">Submit</button>
          </div>
        </footer>
      </div>
      </div>
    </div>
    </div>
    );
  };

  const renderBlogForm = () => {
    return (
      <div className="blogFormWrapper">
      <div className="formContainer">
      <div className="formContainersWrapper">
      <div className="leftContainer">
        <h1 className="formType">
          BLOG
        </h1>
      </div>
      <div className="rightContainer">
          <div className="set">
            <div className="formTitleBox">
              <label className="postFormLabel" htmlFor="pets-name">Title</label>
              <input
              className="postFormInput"
                type="text"
                id="postTitle"
                placeholder="Name your Post"
              />
            </div>
            <div className="formCategoryBox">
              <label htmlFor="category">File Under:</label>
              <select className="eventFormSelectCategory" name="category"
              placeholder="Category">
              <option className="categoryOption" value="Music">Music</option>
              <option className="categoryOption"
              value="DJ">DJs</option>
              <option className="categoryOption"
              value="Photography">Photography</option>
              <option className="categoryOption"
              value="Fashion & Textiles">Fashion</option>
              <option className="categoryOption"
              value="Theater">Theater</option>
              <option className="categoryOption"
              value="Visual Arts">Visual Arts</option>
              <option value="Film">Film</option>
              <option value="Comedy">Comedy</option>
              </select>
              <input
                className="postFormInput"
                type="text"
                id="subcategory"
                placeholder="Subcategories"
              />
            </div>
          </div>
          <div className="set">
            <div className="formDescription">
              <label htmlFor="description">What's on your mind?</label>
            <textarea className="eventFormDescriptionBox" name="description"></textarea>
            </div>
          </div>
        <footer>
          <div className="submit">
            <button className="postSubmitButton">Submit</button>
          </div>
        </footer>
      </div>
      </div>
    </div>
    </div>
    );
  };

  const renderGigForm = () => {
    return (
      <div className="gigFormWrapper">
      <div className="formContainer">
      <div className="formContainersWrapper">
      <div className="leftContainer">
        <h1 className="formType">
          GIGS
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
                placeholder="Name your ad"
              />
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
              <select className="eventFormSelectCategory" name="category"
              placeholder="Category">
              <option className="categoryOption" value="Music">Music</option>
              <option className="categoryOption"
              value="DJ">DJs</option>
              <option className="categoryOption"
              value="Photography">Photography</option>
              <option className="categoryOption"
              value="Fashion & Textiles">Fashion</option>
              <option className="categoryOption"
              value="Theater">Theater</option>
              <option className="categoryOption"
              value="Visual Arts">Visual Arts</option>
              <option value="Film">Film</option>
              <option value="Comedy">Comedy</option>
              </select>
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
            </div>
            <div className="formVenue">
              <label className="postFormLabel">Role</label>
              <input
                className="postFormInput"
                type="text"
                id="eventVenue"
                placeholder="Role title"
              />
            </div>
            <div className="formCompensation">
              <label className="postFormLabel">Compensation</label>
              <input
                className="postFormInput"
                type="text"
                id="gigPay"
                placeholder="Gig Compensation"
              />
            </div>
          </div>
          <div className="set">
            <div className="formDescription">
              <label htmlFor="description">Details</label>
            <textarea className="eventFormDescriptionBox" name="description"></textarea>
            </div>
          </div>
          <div className="set">
            <div className="formDescription">
              <label htmlFor="description">Requirements</label>
            <textarea className="gigFormDescriptionBox" name="description"></textarea>
            </div>
          </div>
          <div className="set">
          <div className="formRestrictions">
            <label htmlFor="ageRestrictions">Duration</label>
            <div className="radio-container">
              <input 
                className="postFormInput"
                type="radio"
                id="allAges"
                name="allAges"
                value="allAges"
                checked={ageRestriction === 'allAges'}
            onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="allAges">One-Time</label>
              <input
                className="postFormInput"
                type="radio"
                id="18"
                name="18"
                value="18"
                checked={ageRestriction === '18'}
              onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="18">Temporary</label>
              <input
                className="postFormInput"
                type="radio"
                id="21"
                name="21"
                value="21"
                checked={ageRestriction === '21'}
              onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="21">Permanent</label>
            </div>
          </div>
          </div>
        <footer>
          <div className="submit">
            <button className="postSubmitButton">Submit</button>
          </div>
        </footer>
      </div>
      </div>
    </div>
    </div>
    );
  };

  return (
    <div>
      <h1>Post Form</h1>
      <label>
        Select post type:
        <select className="postTypeSelect" value={postType} onChange={handlePostTypeChange}>
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


