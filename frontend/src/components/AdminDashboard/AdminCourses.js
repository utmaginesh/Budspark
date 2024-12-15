import { React, useState, useEffect } from 'react';
import '../Assests/css/dashboard.css';
import { BsPencil, BsSave } from 'react-icons/bs';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { FormControlLabel, Checkbox } from '@mui/material';

const AdminCourses = () => {
    
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

    const [orders, setOrders] = useState([]);
    const [evsem, setEvsem] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filteredEvsem, setFilteredEvsem] = useState([]);
    const [oddpage, setOddPage] = useState(1);
    const [evnpage, setEvnPage] = useState(1);
    const [oddpagination, setOddPagination] = useState([]);
    const [evnpagination, setEvnPagination] = useState([]);

    const [editingOrderIndex, setEditingOrderIndex] = useState(null);
    const [editingEvsemIndex, setEditingEvsemIndex] = useState(null);

    const [editedOrders, setEditedOrders] = useState([]);
    const [editedEvsem, setEditedEvsem] = useState([]);
    const [selectedYears, setSelectedYears] = useState({
        first: false,
        second: false,
        third: false,
        fourth: false,
    });
    const [selectedDepartments, setSelectedDepartments] = useState({
        'Computer Science': false,
        'Information Technology': false,
        'Mechanical Engineering': false,
        'Civil Engineering': false,
        'Electrical Engineering': false,
    });

    useEffect(() => {
        setEditedOrders(orders);
        filterCourses();
    }, [orders, selectedYears, selectedDepartments]);

    useEffect(() => {
        setEditedEvsem(evsem);
        filterCourses();
    }, [evsem, selectedYears, selectedDepartments]);

    const filterCourses = () => {
        // Filter odd semester courses
        const filteredOdd = orders.filter(order => 
            (Object.keys(selectedYears).every(year => !selectedYears[year]) || selectedYears[order.year]) &&
            (Object.keys(selectedDepartments).every(dept => !selectedDepartments[dept]) || selectedDepartments[order.department])
        );
        setFilteredOrders(filteredOdd);
        setOddPagination(calculateRange(filteredOdd, 6));

        // Filter even semester courses
        const filteredEven = evsem.filter(order =>
            (Object.keys(selectedYears).every(year => !selectedYears[year]) || selectedYears[order.year]) &&
            (Object.keys(selectedDepartments).every(dept => !selectedDepartments[dept]) || selectedDepartments[order.department])
        );
        setFilteredEvsem(filteredEven);
        setEvnPagination(calculateRange(filteredEven, 6));
    };

    const handleEditClick = (index) => {
        setEditingOrderIndex(index);
    }

    const handleEvsemEditClick = (index) => {
        setEditingEvsemIndex(index);
    }

    const handleChange = (e, index, type) => {
        const { name, value } = e.target;
        const newData = [...(type === 'odd' ? editedOrders : editedEvsem)];
        newData[index][name] = value;
        type === 'odd' ? setEditedOrders(newData) : setEditedEvsem(newData);
    }

    const handleSaveClick = async (index, type) => {
        if (type === 'odd') {
            const updatedOrders = [...orders];
            updatedOrders[index] = editedOrders[index];
            setOrders(updatedOrders);
            setEditingOrderIndex(null);
            try {
                console.log(orders);
                const response = await axios.put(`http://localhost:8080/api/updatecourse/${orders[index].id}`, {
                    code: orders[index].code,
                    name: orders[index].name,
                    credits: orders[index].credits,
                    contactHrs: orders[index].contactHrs,
                });
                console.log('Update successful:', response.data);
                alert("Updated Successfully!");
            }catch (error) {
              console.error('Error updating orders:', error);
            }
            
        } else {
            const updatedEvsem = [...evsem];
            updatedEvsem[index] = editedEvsem[index];
            setEvsem(updatedEvsem);
            setEditingEvsemIndex(null);
            try {
                console.log(orders);
                const response = await axios.put(`http://localhost:8080/api/updatecourse/${evsem[index].id}`, {
                    code: evsem[index].code,
                    name: evsem[index].name,
                    credits: evsem[index].credits,
                    contactHrs: evsem[index].contactHrs,
                });
                console.log('Update successful:', response.data);
                alert("Updated Successfully!");
            }catch (error) {
              console.error('Error updating orders:', error);
            }
        }
    }

    const handleYearCheckboxChange = (event) => {
        setSelectedYears(prev => ({
            ...prev,
            [event.target.name]: event.target.checked,
        }));
    };

    const handleDepartmentCheckboxChange = (event) => {
        setSelectedDepartments(prev => ({
            ...prev,
            [event.target.name]: event.target.checked,
        }));
    };

    useEffect(() => {
        // Fetch odd semester courses
        axios.get(`http://localhost:8080/api/getoddsem`)
        .then(response => {
            setOrders(response.data);
        })
        .catch(error => {
            console.error('Error fetching odd semester courses:', error);
        });

        axios.get(`http://localhost:8080/api/getevensem`)
        .then(response => {
            setEvsem(response.data);
        })
        .catch(error => {
            console.error('Error fetching even semester courses:', error);
        });
    }, []);

    const __handleChangePage = (new_page) => {
        setOddPage(new_page);
    }

    const __handleEvenChangePage = (new_page) => {
        setEvnPage(new_page);
    }

    return (
        <div className='admincourseenrolled'>
            <div className='filters'>
                <div className='year-filters'>
                    <h3>Select Year</h3>
                    {Object.keys(selectedYears).map((year) => (
                        <FormControlLabel
                            key={year}
                            control={
                                <Checkbox
                                    checked={selectedYears[year]}
                                    onChange={handleYearCheckboxChange}
                                    name={year}
                                />
                            }
                            label={year.charAt(0).toUpperCase() + year.slice(1)}
                        />
                    ))}
                </div>
                <div className='department-filters'>
                    <h3>Select Department</h3>
                    {Object.keys(selectedDepartments).map((dept) => (
                        <FormControlLabel
                            key={dept}
                            control={
                                <Checkbox
                                    checked={selectedDepartments[dept]}
                                    onChange={handleDepartmentCheckboxChange}
                                    name={dept}
                                />
                            }
                            label={dept}
                        />
                    ))}
                </div>
            </div>
            <div className='dashboard-content'>
                <div className='dashboard-content-header'>
                    <h2>Courses Enrolled:</h2>
                </div>
                <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Odd Semester</h2>
                    </div>
                    <table className='listtable'>
                        <thead>
                            <th>Year</th>
                            <th>Department</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Total Credits</th>
                            <th>Contact Hrs</th>
                        </thead>

                        {filteredOrders.length !== 0 ?
                            <tbody>
                                {sliceData(filteredOrders, oddpage, 6).map((order, index) => (
                                    <tr key={index}>
                                        <td><span>{order.year}</span></td>
                                        <td><span>{order.department}</span></td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={editedOrders[index].code}
                                                    onChange={(e) => handleChange(e, index, 'odd')}
                                                />
                                            ) : (
                                                <span>{order.code}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editedOrders[index].name}
                                                    onChange={(e) => handleChange(e, index, 'odd')}
                                                />
                                            ) : (
                                                <span>{order.name}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="credits"
                                                    value={editedOrders[index].credits}
                                                    onChange={(e) => handleChange(e, index, 'odd')}
                                                />
                                            ) : (
                                                <span>{order.credits}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="contactHrs"
                                                    value={editedOrders[index].contactHrs}
                                                    onChange={(e) => handleChange(e, index, 'odd')}
                                                />
                                            ) : (
                                                <span>{order.contactHrs}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <SaveIcon style={{ cursor: "pointer", fontSize: "24px" }} onClick={() => handleSaveClick(index, 'odd')} />
                                            ) : (
                                                <BsPencil
                                                    style={{ cursor: "pointer", fontSize: "20px" }}
                                                    onClick={() => handleEditClick(index)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            : null}
                    </table>
                    {filteredOrders.length !== 0 ?
                        <div className='dashboard-content-footer'>
                            {oddpagination.map((item, index) => (
                                <span
                                    key={index}
                                    className={item === oddpage ? 'active-pagination' : 'pagination'}
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
                        <h2>Even Semester</h2>
                    </div>
                    <table className='listtable'>
                        <thead>
                            <th>Year</th>
                            <th>Department</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Total Credits</th>
                            <th>Contact hrs</th>
                        </thead>

                        {filteredEvsem.length !== 0 ?
                            <tbody>
                                {sliceData(filteredEvsem, evnpage, 6).map((order, index) => (
                                    <tr key={index}>
                                        <td><span>{order.year}</span></td>
                                        <td><span>{order.department}</span></td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={editedEvsem[index].code}
                                                    onChange={(e) => handleChange(e, index, 'even')}
                                                />
                                            ) : (
                                                <span>{order.code}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editedEvsem[index].name}
                                                    onChange={(e) => handleChange(e, index, 'even')}
                                                />
                                            ) : (
                                                <span>{order.name}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="credits"
                                                    value={editedEvsem[index].credits}
                                                    onChange={(e) => handleChange(e, index, 'even')}
                                                />
                                            ) : (
                                                <span>{order.credits}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="contactHrs"
                                                    value={editedEvsem[index].contactHrs}
                                                    onChange={(e) => handleChange(e, index, 'even')}
                                                />
                                            ) : (
                                                <span>{order.contactHrs}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <SaveIcon
                                                    style={{ cursor: "pointer", fontSize: "24px" }}
                                                    onClick={() => handleSaveClick(index, 'even')}
                                                />
                                            ) : (
                                                <BsPencil
                                                    style={{ cursor: "pointer", fontSize: "20px" }}
                                                    onClick={() => handleEvsemEditClick(index)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            : null}
                    </table>
                    {filteredEvsem.length !== 0 ?
                        <div className='dashboard-content-footer'>
                            {evnpagination.map((item, index) => (
                                <span
                                    key={index}
                                    className={item === evnpage ? 'active-pagination' : 'pagination'}
                                    onClick={() => __handleEvenChangePage(item)}>
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

export default AdminCourses;
