import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HashLoader } from "react-spinners";

export default function FoodVenueProfileSkeleton({ visitor }) {
    return (
        <div>
            <div className="profile_cover">
                <Skeleton
                    height="347px"
                    containerClassName="avatar-skeleton"
                    style={{ borderRadius: "8px" }}
                />
            </div>
            <div
                className="profile_picture_wrapper"
                style={{
                    marginBottom: "-3rem",
                    transform: "translateY(-8px)",
                    padding: '0 4rem'
                }}
            >
                <div className="profile_picture_left">
                    <div className='profile_picture'>
                        <Skeleton
                            height="180px"
                            width="180px"
                            containerClassName="avatar-skeleton profile_picture_bg"
                            style={{ transform: "translateY(-3.3rem)", borderRadius: '10px' }}
                        />
                    </div>
                    <div className="profile_col">
                        <div className="profile_name">
                            <Skeleton
                                height="35px"
                                width="200px"
                                containerClassName="avatar-skeleton"
                            />
                            <Skeleton
                                height="25px"
                                width="200px"
                                containerClassName="avatar-skeleton"
                                style={{ transform: "translateY(-15.5px)" }}
                            />
                            <div className='' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Skeleton
                                height="30px"
                                width="80px"
                                containerClassName="avatar-skeleton"
                                style={{ transform: "translateY(-15.5px)" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`profile_picture_right friendship ${!visitor && "fix"}`}
                    style={{ gap: '15px', position: 'relative', top: '20px' }}
                >
                    <Skeleton
                        height="40px"
                        width={40}
                        circle
                        containerClassName="avatar-skeleton"
                    />
                </div>
            </div>
        </div>
    )
}
