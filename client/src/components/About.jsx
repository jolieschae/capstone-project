import React from 'react'
import './parallax.css'

function About() {
  return (
    <div id="about">
            <div id="about-container">
                    <h1 id="about-title">PULLUP ►</h1>
                <p id="about-content">
                pullup is The Hub for connection and collaboration amongst local artists of all mediums. Our mission is to support and empower our creators on their journeys as they increase their visiblity, cultivate an active following, showcase their work, manage their personal brands, launch their careers, and monetize off of their passions. With pullup, users can do just that, alongside a like-minded and engaging community of other artists, entertainers, and performers. We've created a platform that supports creators across a multidisciplanary range of artforms. Whether you're a producer, dancer, comedian, fashion desinger, photographer, painter, filmmaker, however you express yourself, <span id='pullup'>pullup.</span>
                </p>
                <div className="button-container">
                  <button className="button">PULLUP</button>
                </div>
            </div>
            {/* <footer id='about-footer'>Created ◉ By&nbsp;Jolie Gielchinsky</footer> */}
        </div>
  )
}

export default About