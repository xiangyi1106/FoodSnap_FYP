import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OpeningHours.css';
import { toast } from 'react-toastify';

const FoodVenueOpeningHours = ({ openingHours, setFormData }) => {

    const handleTimeChange = (day, index, type, value) => {
        setFormData((prevData) => {
            const updatedHours = { ...prevData.openingHours };
            updatedHours[day][index][type] = value;

            // Ensure the close time is not earlier than open time
            const openTime = updatedHours[day][index].open;
            const closeTime = updatedHours[day][index].close;
            if (openTime && closeTime && closeTime < openTime) {
                toast.error("Close time cannot be earlier than open time.");
                updatedHours[day][index].close = "";  // Reset close time if invalid
            }

            return { ...prevData, openingHours: updatedHours };
        });
    };

    const toggleClosed = (day) => {
        setFormData((prevData) => {
            const updatedHours = { ...prevData.openingHours };
            const isCurrentlyClosed = updatedHours[day].every(slot => slot.open === "" && slot.close === "");

            if (isCurrentlyClosed) {
                // Unmark as closed: Add a default time slot
                updatedHours[day] = [{ open: "08:00", close: "17:00" }];
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

    // Convert 12-hour format (am/pm) to 24-hour format
    const convertTo24HourFormat = (time) => {
        const [timePart, modifier] = [time.slice(0, -2), time.slice(-2)];  // Extract time and am/pm
        let [hours, minutes] = timePart.split(':');  // Split hours and minutes

        hours = parseInt(hours, 10);  // Convert hours to a number

        // Convert the time to 24-hour format based on am/pm
        if (modifier === 'pm' && hours !== 12) {
            hours += 12;  // Add 12 hours if it's PM and not 12:xx
        }

        if (modifier === 'am' && hours === 12) {
            hours = 0;  // Midnight case: 12am becomes 00:xx
        }

        // Return the time in 24-hour format
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };


    // Convert 24-hour format to 12-hour format (am/pm)
    const convertTo12HourFormat = (time) => {
        let [hours, minutes] = time.split(':');
        let modifier = 'am';

        hours = parseInt(hours, 10);

        if (hours >= 12) {
            modifier = 'pm';
            if (hours > 12) hours -= 12;
        }
        if (hours === 0) hours = 12;  // Convert 00 to 12 for midnight

        return `${String(hours).padStart(2, '0')}:${minutes} ${modifier}`;
    };

    return (
        <div className="opening-hours">
            {openingHours && Object.keys(openingHours).map((day) => (
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
                                        value={slot.open ? slot.open : ""}
                                        onChange={(e) => handleTimeChange(day, index, 'open', e.target.value)}
                                    />
                                    <label>Close Time:</label>
                                    <input
                                        type="time"
                                        value={slot.close ? slot.close : ""}
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

export default FoodVenueOpeningHours;
