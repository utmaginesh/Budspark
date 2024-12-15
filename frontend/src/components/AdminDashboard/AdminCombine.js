import { useContext, useState ,useEffect} from 'react';
import '../Assests/css/dashboard.css';
import AdminHome from './AdminHome';
import AdminCourses from './AdminCourses';
import AdminFeesStructure from './AdminFeesStructure';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import AdminChat from './AdminChat';

function AdminCombine() {
  const {auth} = useContext(UserContext);
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [tokenExpiration, setTokenExpiration] = useState(localStorage.getItem('tokenExpiration'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  useEffect(() => {
    const checkAuth = () => {
      if (userRole !== 'admin' || !jwtToken || Date.now() > tokenExpiration) {
        navigate('/login');
      }
    };
    checkAuth();
    const intervalId = setInterval(checkAuth, 20000);
    return () => clearInterval(intervalId);
  }, [userRole, jwtToken, tokenExpiration, navigate]);

  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className={`combinelay ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='grid-container'>
        <AdminSidebar
          openSidebarToggle={openSidebarToggle} 
          OpenSidebar={OpenSidebar} 
          setActiveItem={setActiveItem} 
        />
        <div className='main-content'>
          <AdminHeader  OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
          {activeItem === 'Dashboard' && <AdminHome/>}
          {/* {activeItem === 'Dashboard' && <AdminChat/>} */}
          {activeItem === 'Courses' && <AdminCourses />}
          {activeItem === 'Fees Structure' && <AdminFeesStructure />}
          {activeItem !== 'Dashboard' && <div></div>}
        </div>
      </div>
    </div>
  );
}

export default AdminCombine;
