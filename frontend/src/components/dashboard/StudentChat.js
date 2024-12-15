import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Assests/css/StudentChat.css';

const StudentChat = ({ chatId, isEnabled, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:8080/api/getInquiryChat/${chatId}`)
      .then(response => {
        setMessages(response.data);
        console.log('Fetched messages:', response.data);
      })
      .catch(error => {
        console.error('Error fetching inquiries:', error);
      });
  }, [chatId]);

  const getDateTime = (t) => {
    if (!t) return '';
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
      axios.post(`http://localhost:8080/api/saveAdminChat/${chatId}/user/${newMessage}`)
        .then(response => {
          setMessages(response.data);
          setNewMessage('');
          console.log('Updated messages after send:', response.data);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isEnabled) {
      handleSend();
    }
  };

  return (
    <div className='chatmessage'>
      <div id="viewport">
        <Button sx={{ backgroundColor: 'rgb(203, 52, 52)', marginRight: "91%"}} variant="contained" color='secondary' onClick={onBack}>Back</Button>
        <div className="chatbox" id="chatbox">
          <div className="chats">
            <ul>
              {messages.map((message, index) => (
                <li key={index}>
                  <div className={`msg ${message.role === 'admin' ? 'you' : 'him'}`}>
                    <span className="partner">{message.role}</span>
                    {message.message}
                    <span className="time">{getDateTime(message.date)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="sendBox">
            <input
              type="text"
              placeholder="Type Here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isEnabled}
            />
            <Button onClick={handleSend} color="primary">
              <SendIcon/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentChat;
