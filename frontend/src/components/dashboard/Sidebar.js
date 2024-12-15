import React, { useContext, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function Sidebar({ openSidebarToggle, setActiveItem, activeItem }) {
  const navigate = useNavigate();
  const { setAuth, isProfUpdated, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setAuth(false);
    setUser(null);
    localStorage.removeItem('user');
    navigate("/");
    alert("Logged out Successfully");
  };

  useEffect(() => {
    if (openSidebarToggle) {
      setActiveItem('Dashboard');
    }
  }, [openSidebarToggle, setActiveItem]);

  const menuItems = [
    { name: 'Dashboard', icon: 'bx bx-home-alt' },
    { name: 'Submit Inquiry', icon: 'bx bx-send' },
    { name: 'Courses', icon: 'bx bx-book' },
    { name: 'Fees Structure', icon: 'bx bx-dollar-circle' },
    { name: 'Profile', icon: 'bx bx-user' },
    { name: 'Log out', icon: 'bx bx-log-out', action: handleLogout }
  ];

  const handleItemClick = (item) => {
    if (item.name !== 'Log out') {
      if (isProfUpdated === 'true') {
        setActiveItem(item.name);
      } else {
        alert("Update the Profile First!");
        setActiveItem('Profile');
      }
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='proname'>
          <div className='sidebar-brand'>
            <span>Budspark</span>
          </div>
        </div>
      </div>

      <ul className='sidebar-list'>
        {menuItems.map(item => (
          <li
            key={item.name}
            className={`sidebar-list-item ${activeItem === item.name ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <a href="#" onClick={e => e.preventDefault()}>
              <i className={item.icon}></i>
              <span className="links_name">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
