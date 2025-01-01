import React from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { HashLoader } from "react-spinners";

export default function ProfileFollowing() {
    const { profile, loading } = useOutletContext();
    const navigate = useNavigate();

    const handleClick = (userName) => {
        navigate(`/profile/${userName}`);
    };
    return (
        <div className='profile_card'>
            <div className='profile_card_header'>
                Following People
            </div>
            {loading ?
                <>
                    <div className="skelton_loader">
                        <HashLoader color="#30BFBF" />
                    </div>
                </> :
                <>
                    <div className='profile_card_grid'>
                        {profile?.following && profile?.following.map((follow) => (
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
                    {profile?.following?.length === 0 ?
                        <div style={{ textAlign: 'center' }}>
                            <img style={{ width: '90px' }} src={`${process.env.PUBLIC_URL}/images/team-leader.png`} className="" alt="profile_cover"></img>
                            <div style={{ color: 'gray', fontSize: '0.9rem', marginTop: '3px' }}>Sorry, there are currently no following people.</div>
                        </div>
                        : ""}
                </>
            }
        </div>
    )
}
