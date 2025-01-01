import React, { useState, useRef, useEffect } from "react";
import "./ProfileIntroCarousel.css"; // Updated CSS file
import { useOutletContext } from "react-router-dom";
import EditProfile from "../EditProfile/EditProfileLayout";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

// Updated emojis array with keys matching the user data
const emojis = [
    ["💬", "Personal Bio", "about"],       // About (Personal Bio)
    ["🎂", "Birthday", "birthday"],        // Birthday
    ["🚻", "Gender", "gender"],            // Gender
    ["🌍", "Current City", "currentCity"],  // Current City
    ["🍕", "Favorite Food", "favouriteFood"], // Favorite Food
    // ["🥦", "Dietary Preferences", "dietaryPreferences"], // Dietary Preferences or Restrictions
    // ["🚫", "Allergic", "allergies"],       // Allergies
    // ["🍭", "Taste Preference", "tastePreferences"], // Taste Preference
    // ["🌶️", "Spicy Level", "spicyLevel"],   // Spicy Level
    ["ⓕ", "Facebook", "facebook"],         // Facebook
    ["📸", "Instagram", "instagram"],       // Instagram
    ["▶️", "YouTube", "youtube"]            // YouTube
];

const ProfileIntroCarousel = () => {
    const { profile, user, dispatch, visitor, loading } = useOutletContext(); // Fetch the user profile data from context
    
    const [currentProfile, setCurrentProfile] = useState({});

    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (profile && Object.keys(profile).length > 0) {
            setCurrentProfile(profile); // Set the profile once it's available
        }
    }, [profile]);

    const handleProfileUpdate = (updatedProfile) => {
        setCurrentProfile(updatedProfile); // Update profile state
        // toast.success("Profile updated successfully");
    };

    // Format the birthday (assuming profile.bDay, profile.bMonth, profile.bYear exist)
    // const formatBirthday = () => {
    //     if (profile?.bDay && profile?.bMonth && profile?.bYear) {
    //         return `${profile.bDay}/${profile.bMonth}/${profile.bYear}`;
    //     }
    //     return "Not provided";
    // };

     // Helper function to format the birthday into a readable format
     const formatBirthday = (birthday) => {
        if (birthday) {
            const date = new Date(birthday);  // Convert to Date object
            const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Desired format
            return date.toLocaleDateString('en-US', options); // Format as "Month Day, Year"
        }
        return "Not provided";
    };

     // Helper function to get profile data safely
     const getProfileDetail = (key) => {
        if (key === "birthday") {
            return formatBirthday(profile?.birthday);
        }
        // First check if it's in the main profile object or in details
        return profile?.[key] || profile?.details?.[key] || "Not provided";
    };

    const [isVisible, setVisible] = useState(false);

    // Mapping the data from the user profile to the carousel items
    return (
        <div className="profile_intro">
            {isVisible && <EditProfile setVisible={setVisible} user={user} profile={currentProfile} dispatch={dispatch} /> }
            {!visitor && <button className="green_btn" onClick={()=> setVisible(true)} style={{marginTop: '15px'}}>Edit Profile</button>}
            {loading ?
                <>
                    <div className="skelton_loader">
                        <HashLoader color="#30BFBF" />
                    </div>
                </> :
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
            </div>}
        </div>
    );
};

export default ProfileIntroCarousel;
