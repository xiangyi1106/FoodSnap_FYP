import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import CustomBreadcrumbs from '../../components/BreadCrumbs'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import PlaceProfilePictureInfo from '../../components/PlaceProfile/PlaceProfilePictureInfo'
import PlaceProfileMenu from '../../components/PlaceProfile/PlaceProfileMenu'
import './style.css'
import PlaceDetailsNav from '../../components/PlaceDetails/PlaceDetailsNav'
import { generateBreadcrumbs } from '../../functions/generateBreadCrumbs'
import { getFoodVenueDetails } from '../../functions/foodVenue'
import { toast } from 'react-toastify'
// import './PlaceDetailInformation.css';
import '../../components/PlaceProfile/PlaceDetailInformation.css'
import ProfileSkeleton from '../../components/Skeleton/ProfileSkeleton'
import FoodVenueProfileSkeleton from '../../components/Skeleton/FoodVenueProfileSkeleton'

export default function PlaceDetailsLayout({ user }) {

    const location = useLocation();
    const { id } = useParams();
    const [foodVenue, setFoodVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(true); // Track if the component is mounted
    // Generate breadcrumbs using the reusable function
    const breadcrumbs = location.state?.from ? generateBreadcrumbs(location, 'Food Venue Wishlist', location.state?.from, foodVenue?.name) : generateBreadcrumbs(location, 'Search Venue', '/searchVenue', foodVenue?.name);
    // console.log(location.state?.from);
    useEffect(() => {
        const fetchFoodVenue = async () => {
            setLoading(true);
            try {
                const response = await getFoodVenueDetails(id, user.token);
                setFoodVenue(response);
                setLoading(false);
                console.log(response);
            } catch (error) {
                setLoading(false);
                toast.error("Error fetching food venue, please try again: " + error.message);
            }
        };

        fetchFoodVenue();
    }, [id, user]);



    const menuItems = [
        { name: 'overview', label: 'Overview', href: `/foodVenue/${id}` },
        { name: 'reviews', label: 'Reviews', href: `/foodVenue/${id}/reviews` },
        { name: 'posts', label: 'Posts', href: `/foodVenue/${id}/posts` },
        { name: 'photos', label: 'Photos', href: `/foodVenue/${id}/photos` },
        { name: 'menu', label: 'Menu', href: `/foodVenue/${id}/menu` },
        { name: 'events', label: 'Events', href: `/foodVenue/${id}/events` },
        { name: 'promotions', label: 'Promotions', href: `/foodVenue/${id}/promotions` },
    ];

    // if (loading) {
    //     return <div>Loading...</div>; // Add your loading indicator here
    // }

    return (
        <div className="place_detail_information">
            <Header />
            <div className="place_details_wrapper">
                <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
                <div className='profile'>
                    <div className="profile_top" style={{ marginTop: '0' }}>
                        <div className="profile_container" style={{ maxWidth: "none" }}>
                            {loading ? <FoodVenueProfileSkeleton /> :
                            <>
                                <div className="profile_cover">
                                    <img
                                        src={foodVenue?.cover || 'https://cdn.pixabay.com/photo/2023/02/25/20/26/abstract-7814187_1280.jpg'}
                                        className="cover"
                                        style={{ objectFit: 'cover' }}
                                        alt="profile_cover"
                                        loading="lazy"
                                    />
                                </div>
                                {foodVenue && <PlaceProfilePictureInfo foodVenue={foodVenue} user={user} setFoodVenue={setFoodVenue} />}
                            </>
                            }
                                <PlaceDetailsNav items={menuItems} />
                        </div>
                    </div>
                    <div className="profile_bottom">
                        <div className="profile_container" style={{ maxWidth: "none" }}>
                            <div className="bottom_container" style={{ padding: "10px 4rem" }}>
                                <Outlet context={{ foodVenue, user, setFoodVenue }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
