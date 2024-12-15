import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import '../Assests/css/dashboard.css';
import { UserContext } from '../../UserContext';

const Courses = () => {
    const {user, department, year} = useContext(UserContext);
    const calculateRange = (data, rowsPerPage) => {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    };

    const sliceData = (data, page, rowsPerPage) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    };

    const [oddCourses, setOddCourses] = useState([]);
    const [evenCourses, setEvenCourses] = useState([]);
    const [oddPage, setOddPage] = useState(1);
    const [evenPage, setEvenPage] = useState(1);
    const [oddPagination, setOddPagination] = useState([]);
    const [evenPagination, setEvenPagination] = useState([]);

    useEffect(() => {
        // Fetch odd semester courses
        axios.get(`http://localhost:8080/api/getoddsem/${year}/${department}`)
        .then(response => {
            setOddCourses(response.data);
            setOddPagination(calculateRange(response.data, 3));
        })
        .catch(error => {
            console.error('Error fetching odd semester courses:', error);
        });

        // Fetch even semester courses
        axios.get(`http://localhost:8080/api/getevensem/${year}/${department}`)
        .then(response => {
            setEvenCourses(response.data);
            setEvenPagination(calculateRange(response.data, 3));
        })
        .catch(error => {
            console.error('Error fetching even semester courses:', error);
        });
    }, [year, department]);

    const handleOddChangePage = (newPage) => {
        setOddPage(newPage);
    };

    const handleEvenChangePage = (newPage) => {
        setEvenPage(newPage);
    };

    return (
        <div  className='courseenrolled'>
            <div className='dashboard-content-header'>
                <h2>Courses Enrolled:</h2><br></br><br></br><br></br><br></br>
            </div>
        <div className='dashboard-content'>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Odd Semester</h2>
                </div>
                <table className='listtable'>
                    <thead>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Total Credits</th>
                        <th>Contact hrs</th>
                    </thead>

                    {oddCourses.length !== 0 ?
                        <tbody>
                            {sliceData(oddCourses, oddPage, 3).map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.code}</span></td>
                                    <td><span>{order.name}</span></td>
                                    <td><span>{order.credits}</span></td>
                                    <td><span>{order.contactHrs}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {oddCourses.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {oddPagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === oddPage ? 'active-pagination' : 'pagination'}
                                onClick={() => handleOddChangePage(item)}>
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
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Even Semester</h2>
                </div>
                <table className='listtable'>
                    <thead>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Total Credits</th>
                        <th>Contact hrs</th>
                    </thead>

                    {evenCourses.length !== 0 ?
                        <tbody>
                            {sliceData(evenCourses, evenPage, 3).map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.code}</span></td>
                                    <td><span>{order.name}</span></td>
                                    <td><span>{order.credits}</span></td>
                                    <td><span>{order.contactHrs}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {evenCourses.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {evenPagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === evenPage ? 'active-pagination' : 'pagination'}
                                onClick={() => handleEvenChangePage(item)}>
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
    </div>
  )
}

export default Courses