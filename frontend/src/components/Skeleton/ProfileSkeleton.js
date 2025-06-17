import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HashLoader } from "react-spinners";

export default function ProfileSkeleton({ visitor }) {
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
                }}
            >
                <div className="profile_picture_left">
                    <Skeleton
                        height="180px"
                        width="180px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: "translateY(-3.3rem)", borderRadius: '10px' }}
                    />
                    <div className="profile_col">
                        <div className="profile_name">
                            <Skeleton
                                height="35px"
                                width="200px"
                                containerClassName="avatar-skeleton"
                            />
                            <Skeleton
                                height="25px"
                                width="150px"
                                containerClassName="avatar-skeleton"
                                style={{ transform: "translateY(-5.5px)" }}
                            />
                            {visitor && <Skeleton
                                height="30px"
                                width="150px"
                                containerClassName="avatar-skeleton"
                                style={{ transform: "translateY(-15.5px)" }}
                            />}
                        </div>
                    </div>
                </div>
                <div className={`profile_picture_right friendship ${!visitor && "fix"}`}>
                    <Skeleton
                        height="50px"
                        width={80}
                        containerClassName="avatar-skeleton"
                    />
                    <Skeleton
                            height="50px"
                            width={80}
                            containerClassName="avatar-skeleton"
                        />
                        <Skeleton
                            height="50px"
                            width={80}
                            containerClassName="avatar-skeleton"
                        />
                </div>
            </div>
        </div>
    )
}
