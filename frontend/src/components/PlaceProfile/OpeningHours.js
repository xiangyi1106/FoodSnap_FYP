import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OpeningHours.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const OpeningHours = ({ formData, setFormData }) => {
    const [hours, setHours] = useState({
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
        publicHoliday: [],
    });

    const [closedDays, setClosedDays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
        publicHoliday: false,
    });

    useEffect(() => {
        // Update formData state with hours and closedDays
        setFormData(prevData => ({
            ...prevData,
            openingHours: {
                ...hours,
                ...Object.keys(closedDays).reduce((acc, day) => {
                    if (closedDays[day]) {
                        acc[day] = []; // If day is closed, no hours to save
                    } else {
                        acc[day] = hours[day]; // Save hours if day is not closed
                    }
                    return acc;
                }, {}),
            },
            // closedDays,
        }));
    }, [hours, closedDays]);

    const handleTimeChange = (day, index, type, value) => {
        setHours((prevHours) => {
            const updatedHours = { ...prevHours };
            updatedHours[day][index][type] = value;
            return updatedHours;
        });
    };

    const addTimeSlot = (day) => {
        setHours((prevHours) => {
            const updatedHours = { ...prevHours };
            updatedHours[day] = [...updatedHours[day], { open: '00:00', close: '23:59' }];
            return updatedHours;
        });
    };

    const deleteTimeSlot = (day, index) => {
        setHours((prevHours) => {
            const updatedHours = { ...prevHours };
            updatedHours[day] = updatedHours[day].filter((_, i) => i !== index);
            return updatedHours;
        });
    };

    const toggleClosed = (day) => {
        setClosedDays((prevClosedDays) => {
            const updatedClosedDays = { ...prevClosedDays };
            updatedClosedDays[day] = !updatedClosedDays[day];
            return updatedClosedDays;
        });

        if (!closedDays[day]) {
            setHours((prevHours) => ({
                ...prevHours,
                [day]: [], // Clear time slots if marking the day as closed
            }));
        }
    };

    const saveData = async () => {
        try {
            const response = await axios.post('/api/opening-hours/12345', {
                hours,
                closedDays,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    return (
        <div className="opening-hours">
            {Object.keys(hours).map((day) => (
                <div key={day} className="day">
                    <div style={{display: 'flex', gap:'10px', alignItems: 'center'}}>
                        <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                        <Button className='logo_color_text' style={{position: 'relative', bottom: '3px'}}  onClick={() => addTimeSlot(day)}>Add Time Slot</Button>
                    </div>
                    <label className="closed-label">
                        <input
                            type="checkbox"
                            checked={closedDays[day]}
                            onChange={() => toggleClosed(day)}
                        />
                        Closed/Rest Day
                    </label>
                    {!closedDays[day] && (
                        <>
                            {hours[day].map((slot, index) => (
                                <div key={index} className="time-slot">
                                    <label>Openning Time:</label>
                                    <input
                                        type="time"
                                        value={slot.open}
                                        onChange={(e) => handleTimeChange(day, index, 'open', e.target.value)}
                                    />
                                    <label>Close Time:</label>
                                    <input
                                        type="time"
                                        value={slot.close}
                                        onChange={(e) => handleTimeChange(day, index, 'close', e.target.value)}
                                    />
                                    <IconButton aria-label="delete" onClick={() => deleteTimeSlot(day, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                            {/* <button onClick={() => addTimeSlot(day)} className='green_btn'>Add Time Slot</button> */}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OpeningHours;
