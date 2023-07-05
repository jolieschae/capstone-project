import React from 'react'
import './comingsoon.css'

function Error() {
  return (
    <div className="comingSoon">
      <h1 className="comingSoonHeader">
      ERROR</h1>
      <div className="newFeatureDescription">
      it seems like we encountered an error, or the page you are trying to access does not exist. double-check the link, or try refreshing the page. if your browser is still incurring this error, please report it to us, and we'll investigate!
      <div className="reportErrorButtonContainer">
      <button type="button" className="reportErrorButton">
      Report Error
      </button>
      </div>
      </div>
    </div>
  )
}

export default Error