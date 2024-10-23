import React from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

export default function ProfileFollower() {
    const { profile } = useOutletContext();
    return (
        <div className='profile_card'>
            <div className='profile_card_header'>
                Follower
            </div>
            <div className='profile_card_grid'>
                {profile?.followers && profile?.followers.map((follow) => (
                    <div className="profile_photo_card" key={follow._id} >
                        <Link to={`/profile/${follow.username}`}>
                            <img
                                src={follow.picture}
                                alt="following profile picture"
                                className="photo-thumbnail"
                                style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
                            />
                            <div style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '3px' }}>{follow.name}</div>
                        </Link>
                    </div>
                ))}
            </div>
            {profile?.followers?.length === 0 ?
                <div style={{ textAlign: 'center' }}>
                    <img style={{ width: '90px' }} src={`${process.env.PUBLIC_URL}/images/team-skills.png`} className="" alt="profile_cover"></img>
                    <div style={{ color: 'gray', fontSize: '0.9rem', marginTop: '3px' }}>Sorry, there are currently no follower.</div>
                </div>
                : ""}
        </div>
    )
}
