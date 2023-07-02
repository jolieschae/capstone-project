import React, { useContext, useState } from 'react';
import { MyContext } from './MyProvider';

const GigHistoryCard = ({ gig }) => {
    const { usersData } = useContext(MyContext);
  return (
    <div className="gigHistoryCard">
      <div className="gigHeader">
        <div className="gigHost">@{gig.host}
        </div>
      </div>
      <div className="gigDate">{gig.date}</div>
      {gig.active && <div className="gigActive">Active</div>}
      <div className="gigRole">{gig.role}</div>
      <div className="gigDescription">{gig.description}</div>
    </div>
  );
};

export default GigHistoryCard;