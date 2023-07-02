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
  const [currentPage, setCurrentPage] = useState(1);
 const user = usersData.find((user) => user.username === 'jinxley');
 if (!user) {
    return <p>User not found.</p>;
  }
  
  const statusesPerPage = 4;
  const indexOfLastStatus = currentPage * statusesPerPage;
  const indexOfFirstStatus = indexOfLastStatus - statusesPerPage;
  const currentStatuses = user.statuses.slice(indexOfFirstStatus, indexOfLastStatus);

  const totalPages = Math.ceil(user.statuses.length / statusesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                    {user.gighistory.map((gig) => (
                      <GigHistoryCard key={gig.id} gig={gig} />
                    ))}
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
      <div className="pagination">
        {totalPages > 1 && (
          <ul>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
