import React, { useContext, useState } from 'react';
import { MyContext } from './MyProvider';

const StatusCard = ({ status }) => {
    const { usersData } = useContext(MyContext);
  return (
    <div className="statusCard">
      <div className="statusHeader">
        <div className="statusUsername">@{status.username}</div>
        <div className="statusEditButton">
          <button>Edit</button>
        </div>
      </div>
      <div className="statusDatePosted">{status.datePosted} - {status.timePosted}</div>
      <div className="statusMessage">{status.message}</div>
    </div>
  );
};

export default StatusCard;