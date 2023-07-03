import React, { useContext, useState } from 'react';
import { MyContext } from './MyProvider';
import './profile.css';
import './events.css';
import './profileCards.css';
import StatusCard from './StatusCard';
import GigHistoryCard from './GigHistoryCard';

function Profile() {
  const { currentUser } = useContext(MyContext);
  const { usersData } = useContext(MyContext);
  console.log(currentUser);
  const [currentStatusPage, setCurrentStatusPage] = useState(1);
  const [currentGigPage, setCurrentGigPage] = useState(1);
 const user = usersData.find((user) => user.username === 'jinxley');
 if (!user) {
    return <p>User not found.</p>;
  }
  
  const statusesPerPage = 4;
  const gigsPerPage = 4;


  const indexOfLastStatus = currentStatusPage * statusesPerPage;
  const indexOfFirstStatus = indexOfLastStatus - statusesPerPage;
  const currentStatuses = user.statuses.slice(indexOfFirstStatus, indexOfLastStatus);

  const indexOfLastGig = currentGigPage * gigsPerPage;
  const indexOfFirstGig = indexOfLastGig - gigsPerPage;
  const currentGigs = user.gighistory.slice(indexOfFirstGig, indexOfLastGig);

  const totalStatusPages = Math.ceil(user.statuses.length / statusesPerPage);
  const totalGigPages = Math.ceil(user.gighistory.length / gigsPerPage);

  const handleStatusPageChange = (pageNumber) => {
    setCurrentStatusPage(pageNumber);
  };

  const handleGigPageChange = (pageNumber) => {
    setCurrentGigPage(pageNumber);
  };

  return (
    <div className="profileWrapper">
      <div className="profileContainer">
        <div className="bg">
          <div className="profileSection">
            <div className="profileInfo">
              <div className="profileCard">
                <div className="profileHeader">
                  <div className="profileImageContainer">
                    <img
                      className="profileImage"
                      src="https://i.imgur.com/LQUXD1H.png"
                      alt="placeholder image"
                    />
                    <div className="editProfileButtonContainer">
                      <button type="button" className="editProfileButton">
                        Edit profile
                      </button>
                    </div>
                  </div>
                  <div className="profileDetails">
                    <p className="profileFullname">JOLIE GIELCHINSKY</p>
                    <p className="profileUsername">@jinxley</p>
                    <p className="profileArtform">Visual Artist</p>
                    <p className="profileLocation">⟟ New York</p>
                  </div>
                  <div className="profileStats">
                    <div className="stat">
                      <p className="statValue">26</p>
                      <p className="statLabel">Events</p>
                    </div>
                    <div className="stat">
                      <p className="statValue">1026</p>
                      <p className="statLabel">Followers</p>
                    </div>
                    <div className="stat">
                      <p className="statValue">478</p>
                      <p className="statLabel">Following</p>
                    </div>
                  </div>
                </div>
                <div className="profileAbout">
                  <div className="bioTitle">
                    <p>ABOUT</p>
                  </div>
                  <div className="bioDetails">
                    <p>Artist and web developer living in NYC.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profileStatusSection">
            <div className="profileInfo">
              <div className="profileStatusCard">
              <div className="profileStatuses">
                  <div className="statusTitle">
                    <p>CHATS</p>
                  </div>
                  </div>
                  <div className="statusCardContainer">
                    {currentStatuses.map((status) => (
                      <StatusCard key={status.id} status={status} />
                    ))}
                  </div>
                  <div className="pagination">
                {totalStatusPages > 1 && (
                  <div className="paginationButtons">
                    <button className="paginationButton"
                      disabled={currentStatusPage === 1}
                      onClick={() => handleStatusPageChange(currentStatusPage - 1)}
                    >
                      Prev
                    </button>
                    <button className="paginationButton"
                      disabled={currentStatusPage === totalStatusPages}
                      onClick={() => handleStatusPageChange(currentStatusPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
          <div className="profileGigSection">
            <div className="profileInfo">
              <div className="profileGigCard">
              <div className="profileCollabs">
                  <div className="collabsTitle">
                    <p>COLLABS</p>
                  </div>
                  </div>
                  <div className="gigHistoryCardContainer">
                  {currentGigs.map((gig) => (
                    <GigHistoryCard key={gig.id} gig={gig} />
                    ))}
                </div>
                <div className="pagination">
                {totalGigPages > 1 && (
                  <div className="paginationButtons">
                    <button className="paginationButton"
                      disabled={currentGigPage === 1}
                      onClick={() => handleGigPageChange(currentGigPage - 1)}
                    >
                      Prev
                    </button>
                    <button className="paginationButton"
                      disabled={currentGigPage === totalGigPages}
                      onClick={() => handleGigPageChange(currentGigPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profileContent">
        <div className="profileEvents">
          <div className="recentEventsTitle">
            <p>RECENT POSTS</p>
            <a href="#!" className="showAllLink">
              show all
            </a>
          </div>
          <div className="photosContainer">
            <div className="photo">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                alt="image 1"
                className="profilePostCards"
              />
            </div>
            <div className="photo">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                alt="image 1"
                className="profilePostCards"
              />
            </div>
            <div className="photo">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                alt="image 1"
                className="profilePostCards"
              />
            </div>
            <div className="photo">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                alt="image 1"
                className="profilePostCards"
              />
            </div>
          </div>
        </div>
        <div className="profileEvents">
          <div className="recentEventsTitle">
            <p>RECENT EVENTS</p>
            <a href="#!" className="showAllLink">
              show all
            </a>
          </div>
          <div className="photosContainer">
            <div className="photo">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                alt="image 1"
                className="profileAttendedCards"
              />
            </div>
            <div className="photo">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                alt="image 1"
                className="profileAttendedCards"
              />
            </div>
            <div className="photo">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                alt="image 1"
                className="profileAttendedCards"
              />
            </div>
            <div className="photo">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                alt="image 1"
                className="profileAttendedCards"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
