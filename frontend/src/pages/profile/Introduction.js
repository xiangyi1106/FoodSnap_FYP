import React from 'react'
import WorkIcon from '@mui/icons-material/Work';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Introduction() {
    return (
        <div className='profile_intro_wrapper' style={{ marginTop: "50px", borderRadius: "20px" }}>
            <div className='about_me'>
                <div className='about_me_title'>ABOUT ME</div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div className='details'>
                <div className='details_col'>
                    <span>JOB <WorkIcon style={{fontSize:"medium"}}/></span>
                    <span>Software Engineer</span>
                </div>
                <div className='details_col'>
                    <span>BIRTHDAY<CakeIcon style={{fontSize:"medium"}}/></span>
                    <span>11.11.2011</span>
                </div>
                <div className='details_col'>
                    <span>LOCATION <LocationOnIcon style={{fontSize:"medium"}}/></span>
                    <span>Malaysia</span>
                </div>
            </div>

        </div>
    )
}
