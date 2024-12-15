import {React,useState, useEffect} from 'react'
import '../Assests/css/dashboard.css';
import { BsPencil ,BsSave} from 'react-icons/bs';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import axios from 'axios';

const AdminFeesStructure = () => {

    const [selectedYear, setSelectedYear] = useState('first');
    const calculateRange = (data, rowsPerPage) => {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    }
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    }
  
    const sliceData = (data, page, rowsPerPage) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }
    
    const [orders, setOrders] = useState([]);
    const [hostel, setHostel] = useState([]);
    const [page, setPage] = useState(1);
    const [hostelpage, sethostelPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [hostelpagination, sethostelPagination] = useState([]);

    const [editingOrderIndex, setEditingOrderIndex] = useState(null);
    const [editingHostelIndex, setEditingHostelIndex] = useState(null);
    const [editedOrders, setEditedOrders] = useState([]);
    const [editedHostel, setEditedHostel] = useState([]);

    useEffect(() => {
        setEditedOrders(orders);
    }, [orders]);

    useEffect(() => {
        setEditedHostel(hostel);
    }, [hostel]);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/getcollegefees/${selectedYear}`)
        .then(response => {
            setOrders(response.data);
            setPagination(calculateRange(response.data, 10));
        })
        .catch(error => {
            console.error('Error fetching College Fees:', error);
        });

        axios.get(`http://localhost:8080/api/gethostelfees/${selectedYear}`)
        .then(response => {
            setHostel(response.data);
            sethostelPagination(calculateRange(response.data, 10));
        })
        .catch(error => {
            console.error('Error fetching Hostel Fees:', error);
        });
        
    }, [selectedYear]);


  
    //   useEffect(() => {
    //       setPagination(calculateRange(clg_fees, 5));
    //       setOrders(sliceData(clg_fees, page, 5));
    //       sethostelPagination(calculateRange(hostel_fees, 5));
    //       setHostel(sliceData(hostel_fees,hostelpage, 5));
    //   }, []);



    const __handleChangePage = (new_page) => {
        setPage(new_page);
    }

    const __handlehostelChangePage = (new_page) => {
        sethostelPage(new_page);
    }

    const handleEditClick = (index) => {
        setEditingOrderIndex(index);
    }

    const handleHostelEditClick = (index) => {
        setEditingHostelIndex(index);
    }
    const handleChange = (e, index, type) => {
        const { name, value } = e.target;
        const newData = [...(type === 'college' ? editedOrders : editedHostel)];
        newData[index][name] = value;
        type === 'college' ? setEditedOrders(newData) : setEditedHostel(newData);
    }

    const handleSaveClick = async (index, type) => {
        if (type === 'college') {
            const updatedOrders = [...orders];
            updatedOrders[index] = editedOrders[index];
            setOrders(updatedOrders);
            setEditingOrderIndex(null);
            try {
                console.log(orders);
                const response = await axios.put(`http://localhost:8080/api/updatecollegefees/${orders[index].id}`, {
                    department: orders[index].department,
                    tuition: orders[index].tuition,
                    specialCourse: orders[index].specialCourse,
                    total: orders[index].total
                });
                console.log('Update successful:', response.data);
                alert("Updated Successfully!");
            }catch (error) {
              console.error('Error updating orders:', error);
            }
        } else {
            const updatedHostel = [...hostel];
            updatedHostel[index] = editedHostel[index];
            setHostel(updatedHostel);
            setEditingHostelIndex(null);
            try {
                console.log(hostel);
                const response = await axios.put(`http://localhost:8080/api/updatehostelfees/${hostel[index].id}`, {
                    block: hostel[index].block,
                    hfees: hostel[index].hfees,
                    messFees: hostel[index].messFees,
                    total: hostel[index].total
                });
                console.log('Update successful:', response.data);
                alert("Updated Successfully!");
            }catch (error) {
              console.error('Error updating orders:', error);
            }
        }
        window.location.reload();
    }



  return (
        <div  className='courseenrolled'>
            <div className='dashboard-content-header'>
                <h2>Fees Structure:</h2><br></br><br></br><br></br><br></br>
                <FormControl variant="outlined" style={{width: "18%", marginRight:'10px', font: "italic small-caps bold 20px/1 cursive"}}>
                    <InputLabel id="select-year-label">Select Year</InputLabel>
                    <Select
                        labelId="select-year-label"
                        id="select-year"
                        value={selectedYear}
                        onChange={handleYearChange}
                        label="Select Year"
                    >
                        <MenuItem value="first">First</MenuItem>
                        <MenuItem value="second">Second</MenuItem>
                        <MenuItem value="third">Third</MenuItem>
                        <MenuItem value="fourth">Fourth</MenuItem>
                    </Select>
                </FormControl>
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

                    {orders.length !== 0 ?
                        <tbody>
                            {sliceData(orders, page, 10).map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.department}</span></td>
                                    <td>
                                        {editingOrderIndex === index ? (
                                            <input
                                                type="text"
                                                name="tuition"
                                                value={editedOrders[index].tuition}
                                                onChange={(e) => handleChange(e, index, 'college')}
                                            />
                                        ) : (
                                            <span>{order.tuition}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingOrderIndex === index ? (
                                            <input
                                                type="text"
                                                name="specialCourse"
                                                value={editedOrders[index].specialCourse}
                                                onChange={(e) => handleChange(e, index, 'college')}
                                            />
                                        ) : (
                                            <span>{order.specialCourse}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingOrderIndex === index ? (
                                            <input
                                                type="text"
                                                name="total"
                                                value={editedOrders[index].total}
                                                onChange={(e) => handleChange(e, index, 'college')}
                                            />
                                        ) : (
                                            <span>{order.total}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingOrderIndex === index ? (
                                           <SaveIcon style={{ cursor: "pointer", fontSize: "24px" }} onClick={() => handleSaveClick(index, 'college')} />
                                        ) : (
                                            <BsPencil
                                                style={{ cursor: "pointer", fontSize: "22px" }}
                                                onClick={() => handleEditClick(index)}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {orders.length !== 0 ?
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
                            {sliceData(hostel, hostelpage, 10).map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.block}</span></td>
                                    <td>
                                        {editingHostelIndex === index ? (
                                            <input
                                                type="text"
                                                name="hfees"
                                                value={editedHostel[index].hfees}
                                                onChange={(e) => handleChange(e, index, 'hostel')}
                                            />
                                        ) : (
                                            <span>{order.hfees}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingHostelIndex === index ? (
                                            <input
                                                type="text"
                                                name="messFees"
                                                value={editedHostel[index].messFees}
                                                onChange={(e) => handleChange(e, index, 'hostel')}
                                            />
                                        ) : (
                                            <span>{order.messFees}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingHostelIndex === index ? (
                                            <input
                                                type="text"
                                                name="total"
                                                value={editedHostel[index].total}
                                                onChange={(e) => handleChange(e, index, 'hostel')}
                                            />
                                        ) : (
                                            <span>{order.total}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingHostelIndex === index ? (
                                            <SaveIcon style={{ cursor: "pointer", fontSize: "24px" }} onClick={() => handleSaveClick(index, 'hostel')} />
                                        ) : (
                                            <BsPencil
                                                style={{ cursor: "pointer", fontSize: "22px" }}
                                                onClick={() => handleHostelEditClick(index)}
                                            />
                                        )}
                                    </td>
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
                                onClick={() => __handlehostelChangePage(item)}>
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

export default AdminFeesStructure;
