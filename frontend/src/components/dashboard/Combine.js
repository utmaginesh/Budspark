import { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import '../Assests/css/dashboard.css';
import InquirySubmission from './InquirySubmission';
import Courses from './Courses';
import FeesStructure from './FeesStruture';
import ProfilePage from './ProfilePage';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentChat from './StudentChat';

function Combine() {
  const { auth, setIsProfUpdated, user, setDepartment, setYear} = useContext(UserContext);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [rtype, setRtype] = useState('');
  const navigate= useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    rollno: '',
    department: '',
    email: '',
    phone: '',
    year: '',
    rtype: '',
  });
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [tokenExpiration, setTokenExpiration] = useState(localStorage.getItem('tokenExpiration'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  useEffect(() => {
    const checkAuth = () => {
      if (userRole !== 'user' || !jwtToken || Date.now() > tokenExpiration) {
        navigate('/login');
      }
    };
    checkAuth();
    const intervalId = setInterval(checkAuth, 20000);
    return () => clearInterval(intervalId);
  }, [userRole, jwtToken, tokenExpiration, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; 

      try {
        const updateResponse = await axios.get(`http://localhost:8080/api/user/getisUpdate/${user}`);
        if (updateResponse.data) {
          setIsProfUpdated("true");
        } else {
          setIsProfUpdated("false");
        }
      } catch (updateError) {
        console.error('Error fetching update Profile:', updateError);
      }

      try {
        const profileResponse = await axios.get(`http://localhost:8080/api/user/profiles/${user}`);
        setProfile(profileResponse.data);
        setDepartment(profileResponse.data.department);
        setYear(profileResponse.data.year);
        setRtype(profileResponse.data.rtype);
      } catch (profileError) {
        console.error('Error fetching profile:', profileError);
      }
    };

    fetchData();
  }, [user, setIsProfUpdated, setDepartment, setYear, setRtype, rtype]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className={`combinelay ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='grid-container'>
        <Sidebar 
          openSidebarToggle={openSidebarToggle} 
          setActiveItem={setActiveItem} 
          activeItem={activeItem} 
        />
        <div className='main-content'>
          <Header OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
          {activeItem === 'Dashboard' && <Home />}
          {/* {activeItem === 'Dashboard' && <StudentChat />} */}
          {activeItem === 'Submit Inquiry' && <InquirySubmission />}
          {activeItem === 'Courses' && <Courses />}
          {activeItem === 'Fees Structure' && <FeesStructure rtype={rtype}/>}
          {activeItem === 'Profile' && <ProfilePage />}
          {activeItem !== 'Dashboard' && <div></div>}
        </div>
      </div>
    </div>
  );
}

export default Combine;
