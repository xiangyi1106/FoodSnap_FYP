import React, { useState } from 'react';
import './style.css';

const VisitedPlaceGrid = ({ year, month, visits, onDayClick  }) => {

    // Correct calculation for the number of days in the month (month should be zero-indexed)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Get the day of the week of the first day of the month (0 = Sunday, 6 = Saturday)
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Use zero-indexed month here

    // Create an array representing the grid
    const gridItems = [];


    // Fill in the day boxes with information on whether a place was visited
    for (let day = 1; day <= daysInMonth; day++) {
        const isVisited = visits.includes(day); // Check if the day has a visit
        gridItems.push({ day, isVisited });
    }

     // Add trailing empty cells to ensure the grid is always 35 boxes
     while (gridItems.length < 35) {
        gridItems.push(null);
    }

    const [selectedDate, setSelectedDate] = useState(null); // Track the selected day

    const handleDayClick = (day) => {
        setSelectedDate(selectedDate === day ? null : day); // Toggle selection
        onDayClick(day); // Pass the clicked day to the parent
    };

    // Render the grid
    return (
        <div className="grid-container">
            {gridItems.map((item, index) =>
                item ? (
                    <DayBox 
                        key={index} 
                        day={item.day} 
                        isVisited={item.isVisited} 
                        isSelected={selectedDate === item.day} 
                        onDayClick={handleDayClick} 
                    />
                ) : (
                    <div key={index} className="empty-box" />
                )
            )}
        </div>
    );
};

// DayBox component
const DayBox = ({ day, isVisited, isSelected, onDayClick }) => {
    const handleClick = () => {
        if (isVisited) {
            onDayClick(day);
        }
    };

    return (
        <div className={`day-box ${isVisited ? 'visited' : ''}`} onClick={handleClick}>
            <span className="day-number">{day}</span>
            {isVisited && (
                <img 
                    src={isSelected ? `${process.env.PUBLIC_URL}/visited_icons/map.png` : `${process.env.PUBLIC_URL}/visited_icons/map_1.png`} 
                    alt="Visited Icon" 
                    className="visit-icon icon_size_32 icon_button" 
                />
            )}
        </div>
    );
};

export default VisitedPlaceGrid;
