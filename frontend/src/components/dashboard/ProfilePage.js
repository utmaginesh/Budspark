import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import '../Assests/css/profilepage.css';
import { UserContext } from '../../UserContext';

const ProfilePage = () => {
    const { user, setDepartment, setIsProfUpdated} = useContext(UserContext);
    const [isEditing, setIsEditing] = useState({
        name: false,
        rollno: false,
        department: false,
        phone: false,
        year: false,
        rtype: false,
    });

    const [profile, setProfile] = useState({
        name: '',
        rollno: '',
        department: '',
        email: '',
        phone: '',
        year: '',
        rtype: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/profiles/${user}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [user]);

    const handleEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    const handleSave = (field) => {
        setIsEditing({ ...isEditing, [field]: false });
    };

    const handleChange = (field, value) => {
        setProfile({ ...profile, [field]: value });
    };

    const handleUpdate = async () => {
        const newErrors = {};
        Object.keys(profile).forEach(field => {
            if (!profile[field]) {
                newErrors[field] = `${field} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            alert("Fill all the fields");
            setErrors(newErrors);
            return;
        } else {
            setErrors({});
        }

        try {
            await axios.put(`http://localhost:8080/api/updateprofiles/${user}`, profile);
            setDepartment(profile.department);
            setIsProfUpdated('true');
            alert("Profile Updated Successfully.");
            window.location.reload();
            console.log('Updated profile:', profile);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handlePhoneKeyDown = (e) => {
        const key = e.key;
        if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
            e.preventDefault();
        }
    };

    return (
        <div className="profilepage-container">
            <div className="profilepage-header-container">
                <p className="profilepage-header"><b>Details:</b></p>
            </div>
            <div className="profileform-container">
                <form className="profile-form">
                    <div className="profile-item-con">
                        <div className="profileform-group">
                            <label className="profilelabel"><b>Name*</b></label>
                            {isEditing.name ? (
                                <>
                                    <TextField
                                        required
                                        className="profileinput"
                                        value={profile.name}
                                        size="small"
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        InputProps={{
                                            className: 'profile-textfield-input',
                                        }}
                                    />
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('name')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.name}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('name')} />
                                </>
                            )}
                        </div>

                        <div className="profileform-group">
                            <label className="profilelabel"><b>Roll No*</b></label>
                            {isEditing.rollno ? (
                                <>
                                    <TextField
                                        required
                                        className="profileinput"
                                        value={profile.rollno}
                                        size="small"
                                        onChange={(e) => handleChange('rollno', e.target.value)}
                                        InputProps={{
                                            className: 'profile-textfield-input',
                                        }}
                                    />
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('rollno')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.rollno}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('rollno')} />
                                </>
                            )}
                        </div>

                        <div className="profileform-group">
                            <label className="profilelabel"><b>Department*</b></label>
                            {isEditing.department ? (
                                <>
                                    <FormControl className="profileinput" size="small" variant="outlined">
                                        <InputLabel shrink>Department</InputLabel>
                                        <Select
                                            value={profile.department}
                                            onChange={(e) => handleChange('department', e.target.value)}
                                            required
                                            label="Department"
                                        >
                                            <MenuItem value="Computer Science">Computer Science</MenuItem>
                                            <MenuItem value="Information Technology">Information Technology</MenuItem>
                                            <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
                                            <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                                            <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('department')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.department}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('department')} />
                                </>
                            )}
                        </div>

                        <div className="profileform-group">
                            <label className="profilelabel"><b>Year*</b></label>
                            {isEditing.year ? (
                                <>
                                    <FormControl className="profileinput" size="small" variant="outlined">
                                        <InputLabel shrink>Year</InputLabel>
                                        <Select
                                            value={profile.year}
                                            onChange={(e) => handleChange('year', e.target.value)}
                                            required
                                            label="Year"
                                        >
                                            <MenuItem value="first">I</MenuItem>
                                            <MenuItem value="second">II</MenuItem>
                                            <MenuItem value="third">III</MenuItem>
                                            <MenuItem value="fourth">IV</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('year')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.year}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('year')} />
                                </>
                            )}
                        </div>

                        <div className="profileform-group">
                            <label className="profilelabel"><b>Email*</b></label>
                            <p className="profilevalueemail">{profile.email}</p>
                        </div>

                        <div className="profileform-group">
                            <label className="profilelabel"><b>Phone*</b></label>
                            {isEditing.phone ? (
                                <>
                                    <TextField
                                        required
                                        className="profileinput"
                                        value={profile.phone}
                                        size="small"
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        onKeyDown={handlePhoneKeyDown}
                                        inputProps={{ maxLength: 10 }}
                                        InputProps={{
                                            className: 'profile-textfield-input',
                                        }}
                                    />
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('phone')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.phone}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('phone')} />
                                </>
                            )}
                        </div>

                        <div className="profileform-group">
                            <label className="profilelabel"><b>Residence Type*</b></label>
                            {isEditing.rtype ? (
                                <>
                                    <FormControl className="profileinput" size="small" variant="outlined">
                                        <InputLabel shrink>Type</InputLabel>
                                        <Select
                                            value={profile.rtype}
                                            onChange={(e) => handleChange('rtype', e.target.value)}
                                            required
                                            label="Residence Type"
                                        >
                                            <MenuItem value="hostel">Hostel</MenuItem>
                                            <MenuItem value="day scholar">Day Scholar</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('rtype')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.rtype}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('rtype')} />
                                </>
                            )}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginLeft: "40%"}}
                            onClick={handleUpdate}
                            className="profile-update-button">
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
