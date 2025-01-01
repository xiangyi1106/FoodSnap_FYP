import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMediaQuery } from 'react-responsive';

export default function CardSkeleton() {
    const skeletonCards = [1, 2, 3];
    const width564 = useMediaQuery({
        query: "(max-width: 564px)"
    });

    const width769 = useMediaQuery({
        query: "(min-width: 769px)"
    });

    const width1220 = useMediaQuery({
        query: "(min-width: 1220px)"
    });
    
    return (
        <div className='food_event_card_container' >
            {skeletonCards.map((_, index) => (
                <div key={index} className="food_event_card_card" style={{
                    boxShadow: "none",  // Ensure no shadow on hover
                    transform: "none",  // Ensure no transform effect
                }}>
                    <div className="food_event_card_card_image">
                        <Skeleton
                            height="200px"
                            containerClassName="avatar-skeleton"
                            style={{ borderRadius: "8px" }}
                        />
                    </div>
                    <div className="food_event_card_card_header">
                        <Skeleton
                            height="20px"
                            width={140}
                            containerClassName="avatar-skeleton"
                            style={{ transform: "translateY(-0.3rem)" }}
                        />
                    </div>
                    <div className="food_event_card_card_meta">
                        <Skeleton
                            height="15px"
                            width={width564 ? 360 : width1220 ? 240 : 180 }
                            containerClassName="avatar-skeleton"
                        />
                    </div>
                    <div className="food_event_card_card_footer">
                        <div className="food_event_card_card_meta">
                            <Skeleton
                                height="15px"
                                width={width564 ? 360 : width1220 ? 240 : 180 }
                                containerClassName="avatar-skeleton"
                                style={{ transform: "translateY(-0.3rem)" }}
                            />
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}
