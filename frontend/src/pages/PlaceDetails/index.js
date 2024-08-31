import React, { useState } from 'react'
import Header from '../../components/header'
import CustomBreadcrumbs from '../../components/BreadCrumbs'
import { Outlet, useLocation } from 'react-router-dom'
import PlaceProfilePictureInfo from '../../components/PlaceProfile/PlaceProfilePictureInfo'
import PlaceProfileMenu from '../../components/PlaceProfile/PlaceProfileMenu'
import './style.css'
import PlaceDetailsNav from '../../components/PlaceDetails/PlaceDetailsNav'
import { generateBreadcrumbs } from '../../functions/generateBreadCrumbs'
import EditFoodVenueForm from '../EditFoodVenue/EditFoodVenueForm'

export default function PlaceDetailsLayout() {

    const location = useLocation();

    // Generate breadcrumbs using the reusable function
    const breadcrumbs = generateBreadcrumbs(location, 'SearchVenue', '/searchVenue');

    const menuItems = [
        { name: 'overview', label: 'Overview', href: '/venue' },
        { name: 'reviews', label: 'Reviews', href: '/venue/reviews' },
        { name: 'posts', label: 'Posts', href: '/venue/posts' },
        { name: 'photos', label: 'Photos', href: '/venue/photos' },
        { name: 'menu', label: 'Menu', href: '/venue/menu' },
    ];

    const [visible, setVisible] = useState(false);

    return (
        <div className="profile place_detail_information">
            <Header />
            <div className="place_details_wrapper">
                {/* {visible && <EditFoodVenueForm />} */}
                <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
                <div className="profile_top" style={{ marginTop: '0' }}>
                    <div className="profile_container" style={{ maxWidth: "none" }}>
                        <div className="profile_cover">
                            <img src={'https://scontent.fkul15-1.fna.fbcdn.net/v/t39.30808-6/444904586_842473537917351_7715127171235446297_n.jpg?stp=dst-jpg_s960x960&_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=7c79fWvSVywQ7kNvgEgbf90&_nc_ht=scontent.fkul15-1.fna&oh=00_AYD9zOAl4-pQh09VwnQxWfSGFFD1_12FYcbR2vSK9x5OWQ&oe=66CA46B4'} className="cover" alt="profile_cover"></img>
                        </div>
                        {/* <PlaceProfilePictureInfo /> */}
                        <PlaceProfilePictureInfo
                            imageUrl="https://lh5.googleusercontent.com/p/AF1QipNkg5kyWMn-zicbUQuSyB0ge4TMTAyzGfxfWmW4=w408-h306-k-no"
                            placeName="Restaurant The Tribus"
                            rating={4.3}
                            reviewCount={713}
                            priceLevel="$$"
                            categories={['Western','Mexican','Mediterranean']}
                            setVisible={setVisible}
                            visible={visible}
                        />
                        <PlaceDetailsNav items={menuItems} />
                    </div>
                </div>
                <div className="profile_bottom">
                    <div className="profile_container" style={{ maxWidth: "none" }}>
                        <div className="bottom_container" style={{ padding: "10px 4rem" }}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
