import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OpeningHours.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const OpeningHours = ({ openingHours, setFormData }) => {

    useEffect(() => {
        console.log(openingHours);
    }, [openingHours]);

    const handleTimeChange = (day, index, type, value) => {
        setFormData((prevData) => {
            const updatedHours = { ...prevData.openingHours };
            updatedHours[day][index][type] = value;
            return { ...prevData, openingHours: updatedHours };
        });
    };

    const toggleClosed = (day) => {
        setFormData((prevData) => {
            const updatedHours = { ...prevData.openingHours };
            const isCurrentlyClosed = updatedHours[day].every(slot => slot.open === "" && slot.close === "");

            if (isCurrentlyClosed) {
                // Unmark as closed: Add a default time slot
                updatedHours[day] = [{ open: "09:00", close: "17:00" }];
            } else {
                // Mark as closed: Set open and close to empty strings
                updatedHours[day] = updatedHours[day].map(slot => ({
                    ...slot,
                    open: "",
                    close: ""
                }));
            }

            return { ...prevData, openingHours: updatedHours };
        });
    };

    const convertTo24HourFormat = (time) => {
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':');
        if (modifier === 'pm' && hours !== '12') {
            hours = parseInt(hours, 10) + 12;
        }
        if (modifier === 'am' && hours === '12') {
            hours = '00';
        }
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    return (
        <div className="opening-hours">
            {Object.keys(openingHours).map((day) => (
                <div key={day} className="day">
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                    </div>
                    <label className="closed-label">
                        <input
                            type="checkbox"
                            checked={openingHours[day].every(slot => slot.open === "" && slot.close === "")}
                            onChange={() => toggleClosed(day)}
                        />
                        Closed/Rest Day
                    </label>
                    {openingHours[day].some(slot => slot.open !== "" && slot.close !== "") && (
                        <>
                            {openingHours[day].map((slot, index) => (
                                <div key={index} className="time-slot">
                                    <label>Opening Time:</label>
                                    <input
                                        type="time"
                                        value={slot.open ? convertTo24HourFormat(slot.open) : ""}
                                        onChange={(e) => handleTimeChange(day, index, 'open', e.target.value)}
                                    />
                                    <label>Close Time:</label>
                                    <input
                                        type="time"
                                        value={slot.close ? convertTo24HourFormat(slot.close) : ""}
                                        onChange={(e) => handleTimeChange(day, index, 'close', e.target.value)}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OpeningHours;
