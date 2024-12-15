import React, { useEffect, useState ,useContext} from 'react';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function AdminSidebar({ openSidebarToggle, OpenSidebar, setActiveItem }) {
  const navigate = useNavigate();
  const [activeItem, setLocalActiveItem] = useState('Dashboard');
  const {setAuth, setUser} = useContext(UserContext);
  function handleLogout() {
    setAuth(false);
    setUser(null);
    localStorage.removeItem('user');
    navigate("/");
    alert("Logged out Successfully");
  }

  useEffect(() => {
    if (openSidebarToggle) {
      setLocalActiveItem('Dashboard');
    }
  }, [openSidebarToggle, setActiveItem]);

  const menuItems = [
    { name: 'Dashboard', icon: 'bx bx-home-alt' },
    { name: 'Courses', icon: 'bx bx-book' },
    { name: 'Fees Structure', icon: 'bx bx-dollar-circle' },
    { name: 'Log out', icon: 'bx bx-log-out', action: handleLogout }
  ];

  const handleItemClick = (item) => {
    if (item.name !== 'Log out') {
      setLocalActiveItem(item.name);
      setActiveItem(item.name);
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

export default AdminSidebar;
