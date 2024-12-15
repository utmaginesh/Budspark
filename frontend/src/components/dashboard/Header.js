import {React, useContext} from 'react';
import {BsPersonCircle, BsJustify } from 'react-icons/bs';
import { UserContext } from '../../UserContext';

function Header({ OpenSidebar, openSidebarToggle }) {
  const {user} = useContext(UserContext);
  return (
    <header className={`header-dash ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='header-left'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-right'>
        <div className='profile-info'>
          <span className='user-name'>{user}</span>
          <BsPersonCircle className='icon' />
        </div>
      </div>
    </header>
  );
}

export default Header;
