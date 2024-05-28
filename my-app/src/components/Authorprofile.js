import React from 'react';
import { Link,NavLink,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Authorprofile() {
    let {currentUser}=useSelector((state)=>state.userAuthoruserAuthorLoginReducer );
  return (
    <div className="author-profile">
      <ul className='nav justify-content-around'>
        <li className='nav-item'>
            <NavLink to={`articles-by-author/${currentUser.username}`}>
            Articles </NavLink>
        </li>
        <li className='nav-item'>
            <NavLink to={'addarticle'}>Add Article</NavLink>
        </li>
      </ul>
     
      <Outlet />
    </div>
  );
}

export default Authorprofile;
