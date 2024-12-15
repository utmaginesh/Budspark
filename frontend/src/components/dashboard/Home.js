import React, { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import CancelIcon from '../Assests/img/cancel.svg';
import DoneIcon from '../Assests/img/done.svg';
import RefundedIcon from '../Assests/img/refunded.svg';
import StudentChat from './StudentChat';
import axios from 'axios';
import { Button } from '@mui/material';
import { UserContext } from '../../UserContext';

function Home() {
    const {user} = useContext(UserContext);
    const [isdisplay, setIsDisplay] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const [inquiry, setInquiry] = useState([]);
    const [filteredInquiry, setFilteredInquiry] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [chatid, setChatId] = useState();
    const [dynamic, setDynamic] = useState({
        inquiries: 0,
        clarified: 0,
        received: 0,
        inprogress: 0
    });
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }


    const calculateRange = (data, rowsPerPage) => {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    }

    const sliceData = (data, page, rowsPerPage) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/api/getStudentInquiry/${user}`)
        .then(response => {
            setInquiry(response.data);
            setFilteredInquiry(response.data);
            setPagination(calculateRange(response.data, 5));
        })
        .catch(error => {
            console.error('Error fetching inquiries:', error);
        });
        axios.get(`http://localhost:8080/api/getStudentInquiriesCount/${user}`)
        .then(response => {
            setDynamic(response.data);
        })
        .catch(error => {
            console.error('Error fetching inquiries count:', error);
        });

    }, []);

    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = inquiry.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.status.toLowerCase().includes(search.toLowerCase()) ||
                item.department.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredInquiry(search_results);
        } else {
            setFilteredInquiry(inquiry);
            __handleChangePage(1);
        }
    };


    const __handleChangePage = (new_page) => {
        setPage(new_page);
    }
    const handleOpen = (id, ab) => {
        setChatId(id);
        setIsDisplay(false);
        setIsEnabled(ab);
    }

    const handleBack = () => {
        setIsDisplay(true);
    }


    return (
        isdisplay ? (
            <main className='main-container'>
                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Total Inquiries</h3>
                            <i className='bx bx-message-square-detail card_icon'></i>
                        </div>
                        <h1>{dynamic.inquiries}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Total Clarified</h3>
                            <i className='bx bx-check-circle card_icon'></i>
                        </div>
                        <h1>{dynamic.clarified}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Total Sent</h3>
                            <i className='bx bx-send card_icon'></i>
                        </div>
                        <h1>{dynamic.received}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Total Inprogress</h3>
                            <i className='bx bx-loader card_icon'></i>
                        </div>
                        <h1>{dynamic.inprogress}</h1>
                    </div>
                </div>
                <div className='dashboard-content'>
                    <div className='dashboard-content-container'>
                        <div className='dashboard-content-header'>
                            <h2>Inquiry List</h2>
                            <div className='dashboard-content-search'>
                                <input
                                    type='text'
                                    value={search}
                                    placeholder='Search..'
                                    className='dashboard-content-input'
                                    onChange={e => __handleSearch(e)} />
                            </div>
                        </div>
                        <table className='listtable'>
                            <thead>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                                <th>STUDENT</th>
                                <th>SUBJECT</th>
                                <th>DEPARTMENT</th>
                            </thead>
                            {filteredInquiry.length !== 0 ?
                                <tbody>
                                    {sliceData(filteredInquiry, page, 5).map((order, index) => (
                                        <tr key={index}>
                                            <td><span>{order.inquirycode}</span></td>
                                            <td><span>{formatTimestamp(order.submissionDate)}</span></td>
                                            <td>
                                                <div>
                                                    {order.status === 'Responded' ?
                                                        <img
                                                            src={DoneIcon}
                                                            alt='paid-icon'
                                                            className='dashboard-content-icon' />
                                                        : order.status === 'Not Responded' ?
                                                            <img
                                                                src={CancelIcon}
                                                                alt='canceled-icon'
                                                                className='dashboard-content-icon' />
                                                            : order.status === 'Received' ?
                                                                <img
                                                                    src={RefundedIcon}
                                                                    alt='refunded-icon'
                                                                    className='dashboard-content-icon' />
                                                                : null}
                                                    <span>{order.status}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <span>{order.name}</span>
                                                </div>
                                            </td>
                                            <td><span>{order.subject}</span></td>
                                            <td><span>{order.department}</span></td>
                                            {order.status === 'Clarified' &&
                                                <td><ChatIcon style={{ cursor: "pointer", fontSize: "22px" }} onClick={() => handleOpen(order.id)} /></td>}
                                            {order.status === 'Inprogress' &&
                                                <td><ChatIcon style={{ cursor: "pointer", fontSize: "22px" }} onClick={() => handleOpen(order.id, order.isChatEnabled)} /></td>}
                                            {order.status === 'Received' &&
                                                <td></td>}
                                        </tr>
                                    ))}
                                </tbody>
                                : null}
                        </table>
                        {filteredInquiry.length !== 0 ?
                            <div className='dashboard-content-footer'>
                                {pagination.map((item, index) => (
                                    <span
                                        key={index}
                                        className={item === page ? 'active-pagination' : 'pagination'}
                                        onClick={() => __handleChangePage(item)}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                            :
                            <div className='dashboard-content-footer'>
                                <span className='empty-table'>No data</span>
                            </div>
                        }
                    </div>
                </div>
            </main>
        ) : (
            <StudentChat chatId={chatid} isEnabled={isEnabled} onBack={handleBack} />
    )   )
}

export default Home;