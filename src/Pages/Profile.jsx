import React, { useContext } from 'react'
import { TodoContext } from '../Context/Context'
import Loader from '../Components/Loader';

const Profile = () => {
  const { loading, user } = useContext(TodoContext);
  if (loading) return <Loader />;
  return (
    <div className='profile'>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}

export default Profile
