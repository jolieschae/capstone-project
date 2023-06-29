import React, { useContext, useState } from 'react';
import { MyContext } from './MyProvider';

function Profile() {

  const { currentUser } = useContext(MyContext);
  console.log(currentUser)

  return (
    <div>profile</div>
  )
}

export default Profile