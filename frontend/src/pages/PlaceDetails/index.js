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

export default function PlaceDetailsLayout({ user }) {

    const location = useLocation();
    // Generate breadcrumbs using the reusable function
    // const breadcrumbs = generateBreadcrumbs(location, 'SearchVenue', '/searchVenue');

    const { id } = useParams();
    const [foodVenue, setFoodVenue] = useState(null);

    // Generate breadcrumbs using the reusable function
    const breadcrumbs = generateBreadcrumbs(location, 'Search Venue', '/searchVenue', foodVenue?.name);

    useEffect(() => {
        const fetchFoodVenue = async () => {
            try {
                const response = await getFoodVenueDetails(id, user.token);
                setFoodVenue(response);
                console.log(response);
            } catch (error) {
                toast.error("Error fetching food venue, please try again: " + error.message);
            }
        };

        fetchFoodVenue();
    }, [id]);

    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(true); // Track if the component is mounted

    // useEffect(() => {
    //     const fetchFoodVenue = async () => {
    //         setLoading(true); // Start loading
    //         try {
    //             const response = await getFoodVenueDetails(id, user.token);
    //             if (isMounted) {
    //                 setFoodVenue(response);
    //             }
    //         } catch (error) {
    //             if (isMounted) {
    //                 toast.error("Error fetching food venue, please try again: " + error.message);
    //             }
    //         } finally {
    //             if (isMounted) {
    //                 setLoading(false); // Stop loading
    //             }
    //         }
    //     };

    //     fetchFoodVenue();

    //     return () => {
    //         setIsMounted(false); // Cleanup function to mark the component as unmounted
    //     };
    // }, [id, user.token]); // Add user.token if needed

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
                        <div className="profile_cover">
                            <img
                                src={foodVenue?.cover || 'https://cdn.pixabay.com/photo/2023/02/25/20/26/abstract-7814187_1280.jpg'}
                                className="cover"
                                style={{ objectFit: 'cover' }}
                                alt="profile_cover"
                            />
                        </div>
                        {foodVenue && <PlaceProfilePictureInfo foodVenue={foodVenue} user={user} setFoodVenue={setFoodVenue} />}
                        <PlaceDetailsNav items={menuItems} />
                    </div>
                </div>
                <div className="profile_bottom">
                    <div className="profile_container" style={{ maxWidth: "none" }}>
                        <div className="bottom_container" style={{ padding: "10px 4rem" }}>
                            <Outlet context={{ foodVenue, user }}/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
