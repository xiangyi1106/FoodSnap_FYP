import React, { useEffect, useState } from 'react';
import './RestaurantWishlist.css'; // Custom CSS
import { getFoodVenueWishlist, removeFromFoodVenueWishlist } from '../../functions/user';
import { convertTo12HourFormat, getCurrentDayAbbreviation } from '../../functions/fileUtils';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../components/searchVenue/StarRating';
import Tooltip from '@mui/material/Tooltip';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';


const RestaurantWishlist = ({ onRemove, user }) => {

    const [selectedRestaurant, setSelectedRestaurant] = useState('');

    const handleSelectRestaurant = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState([]);

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const wishlistData = await getFoodVenueWishlist(user.token);
            setWishlist(Array.isArray(wishlistData) ? wishlistData : []);
            wishlistData.length > 0 && setSelectedRestaurant(wishlistData[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Error fetching wishlist, please try again");
        }

    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (id) => {
        await removeFromFoodVenueWishlist(id, user.token);
        setWishlist((prevWishlist) => {
            const newWishlist = prevWishlist.filter((item) => item._id !== id);

            if (newWishlist.length > 0) {
                // Find the index of the restaurant being removed
                const removedIndex = prevWishlist.findIndex(item => item._id === id);

                // Determine the new selected restaurant (either the previous or the next item)
                const newSelectedRestaurant =
                    newWishlist[removedIndex] || newWishlist[removedIndex - 1] || newWishlist[0];

                setSelectedRestaurant(newSelectedRestaurant);
            } else {
                // If wishlist is empty, set selectedRestaurant to null
                setSelectedRestaurant(null);
            }

            return newWishlist;
        });
    };


    const navigate = useNavigate();

    const handleClick = (id) => {
        // navigate(`/foodVenueWishlist/${id}`);
        // navigate(`/foodVenue/${id}`, {
        //     state: { breadcrumbs: [{ label: 'Wishlist', href: '/foodVenueWishlist' }] }
        // });
        navigate(`/foodVenue/${id}`, { state: { from: '/foodVenueWishlist' } });
    };

    // Helper function to open Google Maps in a new tab
    const handleGetDirection = () => {

        if (selectedRestaurant?.latitude && selectedRestaurant?.longitude) {
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant?.latitude},${selectedRestaurant?.longitude}`;
            window.open(mapsUrl, '_blank', 'noopener noreferrer');
        } else {
            alert('Coordinates not available for this location.');
        }

        // let mapsUrl;

        // // Check if name is available
        // if (selectedRestaurant?.name) {
        //     mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRestaurant?.name)}`;
        // }

        // // Fallback to latitude and longitude if no name or search fails
        // if (!mapsUrl && selectedRestaurant?.latitude && selectedRestaurant?.longitude) {
        //     mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant?.latitude},${selectedRestaurant?.longitude}&travelmode=driving`;
        // }

        // // If no valid data is available
        // if (!mapsUrl) {
        //     alert('Location details are not available.');
        //     return;
        // }

        // // Open the generated URL
        // window.open(mapsUrl, '_blank', 'noopener noreferrer');
    };

    const currentDayAbbreviation = getCurrentDayAbbreviation();

    return (
        <section className="restaurant_wishlist_section">
            <div className="restaurant_wishlist_wrapper">
                <div className="restaurant_wishlist_layout">
                    <div className="restaurant_wishlist_content">
                        <div className="restaurant_wishlist_card">
                            <div className="restaurant_wishlist_card_body">
                                <div className="restaurant_wishlist_row">
                                    <div className="restaurant_wishlist_left_col">
                                        <h5 className="restaurant_wishlist_back_link">
                                            Food Venue Wishlist
                                        </h5>
                                        <hr />
                                        {loading ?
                                            <>
                                                <div className="skelton_loader">
                                                    <HashLoader color="#30BFBF" />
                                                </div>
                                            </> :
                                            <>
                                                <div className="restaurant_wishlist_header">
                                                    <div>
                                                        {wishlist && wishlist.length > 0 ?
                                                            <p className="restaurant_wishlist_subtitle">
                                                                You have {wishlist.length} {wishlist.length === 1 ? "food venue" : "food venues"} in your wishlist
                                                            </p>
                                                            : <div style={{ textAlign: 'center' }}>
                                                                <img src={`${process.env.PUBLIC_URL}/images/ice-cream.png`} style={{ margin: '10px 0' }}></img>
                                                                <p>You have not food venue wishlist yet.</p>
                                                                <p style={{ fontSize: '0.9rem', color: 'gray' }}><i>Please press on the bookmark button in food venue page to save it to your wishlist.</i></p>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>

                                                {/* List of restaurants */}
                                                {wishlist && wishlist.length > 0 && wishlist.map((restaurant, index) => (
                                                    <RestaurantItem
                                                        key={index}
                                                        imgSrc={restaurant.picture}
                                                        name={restaurant.name}
                                                        rating={restaurant.rating}
                                                        desc={restaurant.description}
                                                        location={restaurant.address}
                                                        price={restaurant.priceRange}
                                                        id={restaurant._id}
                                                        date={restaurant.createdAt}
                                                        onRemove={() => handleRemove(restaurant._id)} // Pass the call to handleRemove with id
                                                        onSelect={() => handleSelectRestaurant(restaurant)} // Handle restaurant click
                                                    />
                                                ))}
                                            </>}
                                    </div>
                                    <div className="restaurant_wishlist_right_col">
                                        <div className="restaurant_wishlist_payment_card">
                                            {loading ?
                                                <>
                                                    <div className="skelton_loader">
                                                        <HashLoader color="#30BFBF" />
                                                    </div>
                                                </> :
                                                <>
                                                    <h5 className="center" style={{ marginBottom: '15px' }}>Food Venue Details</h5>
                                                    <div className="restaurant_wishlist_summary">
                                                        <div className="restaurant_wishlist_summary_row">
                                                            {!selectedRestaurant ?
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
                                                                    <img src={`${process.env.PUBLIC_URL}/images/ice-cream-1.png`}></img>
                                                                    <p style={{ textAlign: 'center' }}>Add food venue to your wishlist and see the details.</p>
                                                                </div>

                                                                : <div>
                                                                    {selectedRestaurant?.picture && <img src={selectedRestaurant?.picture} alt={selectedRestaurant?.name} className="restaurant_wishlist_detail_img" />}
                                                                    <h5>{selectedRestaurant?.name}</h5>
                                                                    <p>{selectedRestaurant?.description}</p>
                                                                    <p className="restaurant_wishlist_location" style={{ color: 'white' }}>
                                                                        {selectedRestaurant?.address}
                                                                    </p>
                                                                    <div className="info_profile">
                                                                        <div className="info_profile_title source-sans-3-bold" style={{ color: 'white', fontSize: '1.2rem' }}>Price Range</div>
                                                                    </div>
                                                                    <p className="restaurant_wishlist_price">
                                                                        {selectedRestaurant?.priceRange || "No details"}
                                                                    </p>
                                                                    {/* <div className="info_profile">
                                                                <div className="info_profile_title source-sans-3-bold" style={{ color: 'white', fontSize: '1.2rem' }}>Contact Number</div>
                                                            </div>
                                                            <p className="restaurant_wishlist_price">
                                                                {selectedRestaurant?.phone || "-"}
                                                            </p> */}
                                                                    <div className="info_profile">
                                                                        <div className="info_profile_title source-sans-3-bold" style={{ color: 'white', fontSize: '1.2rem' }}>Opening Hours</div>
                                                                    </div>
                                                                    <div className="opening_hour">
                                                                        {Object.entries(selectedRestaurant?.openingHours || {}).map(([day, times], index) => (
                                                                            <div key={index} className="opening_hour_row" style={{ color: day === currentDayAbbreviation ? 'black' : 'white' }}>
                                                                                <div className="opening_hour_day" style={{ minWidth: '50px' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                                                                                <div className="opening_hour_time">
                                                                                    {times.length > 0 ? (
                                                                                        times.map((time, idx) => (
                                                                                            <div key={idx}>
                                                                                                {time.open && time.close
                                                                                                    ? `${convertTo12HourFormat(time.open)} - ${convertTo12HourFormat(time.close)}`
                                                                                                    : <span>Closed</span>}
                                                                                                {/* {convertTo12HourFormat(time.open)} - {convertTo12HourFormat(time.close)} */}
                                                                                            </div>
                                                                                        ))
                                                                                    ) : (
                                                                                        <span>Closed</span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className='flex-center' style={{ marginTop: '20px', gap: '20px' }}>
                                                                        <Tooltip title="See Food Venue Details in Venue Page">
                                                                            <button className='btn_view' onClick={() => selectedRestaurant && handleClick(selectedRestaurant?._id)}>View Details</button>
                                                                        </Tooltip>
                                                                        {selectedRestaurant?.latitude && selectedRestaurant?.longitude &&
                                                                            <Tooltip title="Get Direction From Google Maps">
                                                                                <button className='btn_view' onClick={handleGetDirection}>Get Direction</button>
                                                                            </Tooltip>}
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </>}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const RestaurantItem = ({ imgSrc, name, desc, rating, location, onSelect, onRemove, id, date }) => (

    <div className="restaurant_wishlist_item hover_style_3" onClick={onSelect}>
        <div className="restaurant_wishlist_item_body">
            <div className="restaurant_wishlist_item_info">
                {imgSrc && <img src={imgSrc} alt={name} className="restaurant_wishlist_item_img" />}
                <div className="restaurant_wishlist_item_details">
                    <h5>{name}</h5>
                    {/* <p>{desc}</p> */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><StarRating rating={rating} /> <span>({rating})</span> </div>
                    <p className="restaurant_wishlist_location">{location}</p>
                    {/* <p style={{ color: 'gray', fontSize: '0.85rem' }}>Saved at: {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                </div>
            </div>
            <div className="restaurant_wishlist_item_actions">
                <CIcon icon={cilTrash} className='icon_size_20 icon_button'
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering onSelect when removing
                        onRemove();
                    }}></CIcon>
            </div>
        </div>
    </div>
);

export default RestaurantWishlist;
