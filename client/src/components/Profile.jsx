import React, { useContext, useState } from 'react';
import { MyContext } from './MyProvider';
import './profile.css'

function Profile() {
  const { currentUser } = useContext(MyContext);
  console.log(currentUser);

  return (
    <div className="profileWrapper">
    <div className="profileContainer">
      <div className="bg">
        <div className="profileSection">
          <div className="profileInfo">
            <div className="profileCard">
              <div className="profileHeader">
                <div className="profileImageContainer">
                  <img className="profileImage"
                    src="https://i.imgur.com/LQUXD1H.png"
                    alt="placeholder image"
                  /><div className="editProfileButtonContainer">
                    <button type="button" className="editProfileButton">
                    Edit profile
                  </button></div></div>
                  
                
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
              </div></div>
              <div className="profileAbout">
                <div className="bioTitle">
                  <p>ABOUT</p>
                </div>
                <div className="bioDetails">
                  <p>Artist and web developer living in NYC.</p>
                </div>
              </div>
              {/* <div className="profileEvents">
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
                      className="photoImage"
                    />
                  </div>
                  <div className="photo">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1"
                      className="photoImage"
                    />
                  </div>
                  <div className="photo">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1"
                      className="photoImage"
                    />
                  </div>
                  <div className="photo">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1"
                      className="photoImage"
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
                      className="photoImage"
                    />
                  </div>
                  <div className="photo">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1"
                      className="photoImage"
                    />
                  </div>
                  <div className="photo">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1"
                      className="photoImage"
                    />
                  </div>
                  <div className="photo">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1"
                      className="photoImage"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;