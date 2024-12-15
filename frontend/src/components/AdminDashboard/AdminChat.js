import React, { useEffect, useState } from 'react';
import '../Assests/css/AdminChat.css'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; // Add this import for the Send icon
import axios from 'axios';
import { isDisabled } from '@testing-library/user-event/dist/utils';

const AdminChat = ({ chatId, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isUpdateClicked, setUpdateClicked] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedoptions, setSelectedOptions] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/getInquiryChat/${chatId}`)
            .then(response => {
                setMessages(response.data);
                console.log(messages);
            })
            .catch(error => {
                console.error('Error fetching inquiries:', error);
            });
    }, [chatId]);

    const handleUpdate= async()=>{
        setUpdateClicked(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/updateStatus/${chatId}/${selectedStatus}`);
            setUpdateClicked(false);
            setSelectedStatus('');
            alert('Update successful');
        } catch (error) {
            console.error('Error updating data:', error);
        }
        
    }
    
    const handleChange= async()=>{
        setIsConfirm(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/updateChatOption/${chatId}/${selectedoptions}`);
            setIsConfirm(false);
            setSelectedOptions('');
            alert('Update successful');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    const getDateTime = (t) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = new Date(t);  
        const month = monthNames[d.getMonth()];
        const day = d.getDate().toString().padStart(2, '0');
        const hour = d.getHours().toString().padStart(2, '0');
        const min = d.getMinutes().toString().padStart(2, '0');
        return `${month} ${day} ${hour}:${min}`;
    };

    const handleSend = () => {
        if (newMessage.trim() !== '') {
            axios.post(`http://localhost:8080/api/saveAdminChat/${chatId}/${'admin'}/${newMessage}`)
                .then(response => {
                    setMessages(response.data);
                    setNewMessage('');
                    console.log(messages);
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className='adminchatmessage'>
            <div id="adminviewport">
                <Button sx={{ backgroundColor: 'rgb(203, 52, 52)', marginRight: "91%" }} variant="contained" color='secondary' onClick={onBack}>Back</Button>
                <div className="adminchatbox" id="adminchatbox">
                    <div className="adminchats">
                        <ul>
                            {messages.map((message, index) => (
                                <li key={index}>
                                    <div className={`adminmsg ${message.role === 'admin' ? 'adminhim' : 'adminyou'}`}>
                                        <span className="adminpartner">{message.role}</span>
                                        {message.message}
                                        <span className="admintime">{getDateTime(message.date)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="adminsendBox">
                        <input
                            type="text"
                            placeholder="Type Here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <Button onClick={handleSend} color="primary">
                            <SendIcon/>
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "150px", gap:"30px",display: "flex",flexDirection: "column"}}>
                    <div style={{marginRight: "90px"}}>
                        {isUpdateClicked &&
                        <div className='bhere'>
                            <select class="button top-left" value={selectedStatus} onChange={(e) => {setSelectedStatus(e.target.value)}} 
                                style={{padding: '3px',border: '1px solid #ccc',borderRadius: '4px',backgroundColor: 'rgba(235, 235, 235, 0.7)',marginRight:'9%'}}>
                                <option value=""  disabled="true" selected>Mark as</option>
                                <option value="Clarified">Clarified</option>
                                <option value="Received">Received</option>
                                <option value="Inprogress">Inprogress</option>
                            </select>
                            <Button variant='contained' size='small' color='secondary' sx={{backgroundColor:'rgb(226, 62, 62)'}}onClick={()=>{setUpdateClicked(false);setSelectedStatus('')}} >Cancel</Button>
                        </div>}
                        <Button variant="contained"  color="secondary" sx={{backgroundColor: 'rgb(235, 157, 13)',marginTop:'3%'}} onClick={handleUpdate}>
                            Update
                        </Button>
                    </div>
                    <div style={{marginRight: "90px"}}>
                        {isConfirm &&
                        <div className='bhere'>
                            <select class="button top-left" value={selectedoptions} onChange={(e) => {setSelectedOptions(e.target.value)}}
                                style={{padding: '3px',border: '1px solid #ccc',borderRadius: '4px',backgroundColor: 'rgba(235, 235, 235, 0.7)',marginRight:'10%'}}>
                                <option value="" selected disabled="true">Chat Option</option>
                                <option value="enable">Enable</option>
                                <option value="disable">Disable</option>
                            </select>
                            
                            <Button variant='contained' color='secondary'size='small' sx={{backgroundColor:'rgb(226, 62, 62)'}} onClick={()=>{setIsConfirm(false);setSelectedOptions('')}} >Cancel</Button>
                        </div>}
                        <Button variant="contained" color="secondary"  sx={{backgroundColor: '#f77644',marginTop:'3%'}} onClick={handleChange}>
                            Change
                        </Button>
                    </div>
                </div>
        </div>
    );
};

export default AdminChat;
