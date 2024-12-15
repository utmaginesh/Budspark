import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import '../Assests/css/Login.css';
import email_icon from '../Assests/img/email.png';
import password_icon from '../Assests/img/password.png';
import user_icon from '../Assests/img/person.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser, setAuth, setRole, auth } = useContext(UserContext);
    localStorage.setItem('jwtToken', null);
    localStorage.setItem('userRole', null);
    localStorage.setItem('userEmail', null);
    localStorage.setItem('tokenExpiration', null);
    const handleSignup = async () => {
        if (action === "Login") {
            setAction("Sign Up");
            setName('');
            setEmail('');
            setPassword('');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/user/register', {
                name,
                email,
                password,
            });
            console.log(response);
            if (response.data === 1) {
                alert('Student already Registered.');
                navigate('/login');
                window.location.reload();
                return;
            } else {
                setUser(email);
                setRole('user');
                setName('');
                setEmail('');
                setPassword('');
                handleLogin();
                alert('Registered Successfully');
                navigate('/login');
                return;
            }
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };

    const handleLogin = async () => {
        if (action === "Sign Up") {
            setAction("Login");
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', {
                username: email,
                password,
            });
            if (response.status === 200) {
                const token = response.data;
                const decodedToken = jwtDecode(token);
                
                const role = decodedToken.Role;
                const userEmail = decodedToken.Email;
                    
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userRole', role);
                localStorage.setItem('userEmail', userEmail);
                localStorage.setItem('tokenExpiration', Date.now() + 1800000);

                if (role === 'admin') {
                    setRole('admin');
                    navigate('/admindashboard');
                    alert('Admin Logged In Successfully');
                } else {
                    setRole('user');
                    navigate('/dashboard');
                    alert('Logged In Successfully');
                }
                
                setAuth(true);
                setUser(email);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert('User not found!');
                    handleSignup();
                } else if (error.response.status === 401) {
                    alert('Invalid Credentials.');
                } else {
                    console.log('Error:', error.message);
                }
            } else {
                console.log('Error:', error.message);
            }
        }
            
    };

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <div className='loginpage'>
            <div className='container'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    {action === "Login" ? <div></div> : 
                    <div className='input'>
                        <img src={user_icon} alt=''></img>
                        <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required></input>
                    </div>}
                    <div className='input'>
                        <img src={email_icon} alt=''></img>
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt=''></img>
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                </div>
                {/* {action === 'Sign Up' ? <div></div> :
                <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>} */}
                <div className='submit-container'>
                    <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={handleSignup}>Sign Up</div>
                    <div type="submit" className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={handleLogin}>Login</div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
