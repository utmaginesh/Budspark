import {React,useState, useEffect, useContext} from 'react'
import '../Assests/css/dashboard.css';
import { UserContext } from '../../UserContext';
import axios from 'axios';
const FeesStructure = ({rtype}) => {
    const {year} = useContext(UserContext);
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
    const [college, setCollege] = useState([]);
    const [hostel, setHostel] = useState([]);
    const [page, setPage] = useState(1);
    const [hostelpage, sethostelPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [hostelpagination, sethostelPagination] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/getcollegefees/${year}`)
        .then(response => {
            setCollege(response.data);
            setPagination(calculateRange(response.data, 5));
        })
        .catch(error => {
            console.error('Error fetching College Fees:', error);
        });

        axios.get(`http://localhost:8080/api/gethostelfees/${year}`)
        .then(response => {
            setHostel(response.data);
            sethostelPagination(calculateRange(response.data, 5));
        })
        .catch(error => {
            console.error('Error fetching Hostel Fees:', error);
        });

        
        
    }, [year]);

    const handleChangePage = (new_page) => {
        setPage(new_page);
    }

    const handlehostelChangePage = (new_page) => {
        sethostelPage(new_page);
    }

    return (
        <div  className='courseenrolled'>
            <div className='dashboard-content-header'>
                <h2>Fees Structure:</h2><br></br><br></br><br></br><br></br>
            </div>
        <div className='dashboard-content'>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>College Fees</h2>
                </div>
                <table className='listtable'>
                    <thead>
                        <th>Department</th>
                        <th>Tution Fees</th>
                        <th>Special Course Fees</th>
                        <th>Total Fees</th>
                    </thead>

                    {college.length !== 0 ?
                        <tbody>
                            {sliceData(college, page, 5).map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.department}</span></td>
                                    <td><span>{order.tuition}</span></td>
                                    <td><span>{order.specialCourse}</span></td>
                                    <td><span>{order.total}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {college.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => handleChangePage(item)}>
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
            {rtype === 'hostel' && (
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Hostel Fees</h2>
                </div>
                <table className='listtable'>
                    <thead>
                        <th>Block</th>
                        <th>Hostel Fees</th>
                        <th>Mess Fees</th>
                        <th>Total</th>
                    </thead>

                    {hostel.length !== 0 ?
                        <tbody>
                            {sliceData(hostel, hostelpage, 5).map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.block}</span></td>
                                    <td><span>{order.hfees}</span></td>
                                    <td><span>{order.messFees}</span></td>
                                    <td><span>{order.total}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {hostel.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {hostelpagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === hostelpage ? 'active-pagination' : 'pagination'}
                                onClick={() => handlehostelChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>)}
        </div>
        </div>
    )
}

export default FeesStructure;
