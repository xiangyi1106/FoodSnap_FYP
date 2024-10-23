import React, { useState, useRef } from "react";
import "./ProfileIntroCarousel.css"; // Updated CSS file
import { useOutletContext } from "react-router-dom";

// Updated emojis array with keys matching the user data
const emojis = [
    ["💬", "Personal Bio", "about"],       // About (Personal Bio)
    ["🎂", "Birthday", "birthday"],        // Birthday
    ["🚻", "Gender", "gender"],            // Gender
    ["🌍", "Current City", "currentCity"],  // Current City
    ["🍕", "Favorite Food", "favouriteFood"], // Favorite Food
    ["🥦", "Dietary Preferences", "dietaryPreferences"], // Dietary Preferences or Restrictions
    ["🚫", "Allergic", "allergies"],       // Allergies
    ["🍭", "Taste Preference", "tastePreferences"], // Taste Preference
    ["🌶️", "Spicy Level", "spicyLevel"],   // Spicy Level
    ["ⓕ", "Facebook", "facebook"],         // Facebook
    ["📸", "Instagram", "instagram"],       // Instagram
    ["▶️", "YouTube", "youtube"]            // YouTube
];

const ProfileIntroCarousel = () => {
    const { profile } = useOutletContext(); // Fetch the user profile data from context
    // Format the birthday (assuming profile.bDay, profile.bMonth, profile.bYear exist)
    const formatBirthday = () => {
        if (profile?.bDay && profile?.bMonth && profile?.bYear) {
            return `${profile.bDay}/${profile.bMonth}/${profile.bYear}`;
        }
        return "Not provided";
    };

     // Helper function to get profile data safely
     const getProfileDetail = (key) => {
        if (key === "birthday") {
            return formatBirthday();
        }
        // First check if it's in the main profile object or in details
        return profile?.[key] || profile?.details?.[key] || "Not provided";
    };

    // Mapping the data from the user profile to the carousel items
    return (
        <div className="profile_intro">
            <div className="profile_intro_carousel">
                <div className={`profile_intro_carousel__container`}>
                    {emojis.map((emoji, index) => (
                        <div className="profile_intro_carousel__item" key={index}>
                            <div className="profile_intro_carousel__item-head">{emoji[0]}</div>
                            <div className="profile_intro_carousel__item-body">
                                <p className="title">{emoji[1]}</p>
                                <p style={{textTransform: 'capitalize', color: 'gray'}}>{getProfileDetail(emoji[2])}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileIntroCarousel;
