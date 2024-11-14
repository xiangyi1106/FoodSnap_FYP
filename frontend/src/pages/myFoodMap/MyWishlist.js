import React, { useEffect, useState } from 'react';
import './RestaurantWishlist.css'; // Custom CSS
import { getFoodVenueWishlist, removeFromFoodVenueWishlist } from '../../functions/user';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';

const RestaurantWishlist = ({ onRemove, user }) => {

    const [selectedRestaurant, setSelectedRestaurant] = useState('');

    const handleSelectRestaurant = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            const wishlistData = await getFoodVenueWishlist(user.token);
            setWishlist(wishlistData); // Set state with fetched data
            wishlistData.length > 0 && setSelectedRestaurant(wishlistData[0]);
        };

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
    navigate(`/myWishlistVenue/${id}`);

  };

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
                                        <div className="restaurant_wishlist_header">
                                            <div>
                                                {wishlist.length > 0 ?
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
                                        {wishlist.length > 0 && wishlist.map((restaurant, index) => (
                                            <RestaurantItem
                                                key={index}
                                                imgSrc={restaurant.picture}
                                                name={restaurant.name}
                                                desc={restaurant.description}
                                                location={restaurant.address}
                                                price={restaurant.priceRange}
                                                id={restaurant._id}
                                                date={restaurant.createdAt}
                                                onRemove={() => handleRemove(restaurant._id)} // Pass the call to handleRemove with id
                                                onSelect={() => handleSelectRestaurant(restaurant)} // Handle restaurant click
                                            />
                                        ))}
                                    </div>

                                    <div className="restaurant_wishlist_right_col">
                                        <div className="restaurant_wishlist_payment_card">
                                            <h5 className="mb-0">Food Venue Details</h5>
                                            <div className="restaurant_wishlist_summary">
                                                <div className="restaurant_wishlist_summary_row">
                                                    {!selectedRestaurant ?
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
                                                            <img src={`${process.env.PUBLIC_URL}/images/ice-cream-1.png`}></img>
                                                            <p style={{ textAlign: 'center' }}>Add food venue to your wishlist and see the details.</p>
                                                        </div>

                                                        : <div>
                                                            <img src={selectedRestaurant.picture} alt={selectedRestaurant.name} className="restaurant_wishlist_detail_img" />
                                                            <h5>{selectedRestaurant.name}</h5>
                                                            <p>{selectedRestaurant.description}</p>
                                                            <p className="restaurant_wishlist_location" style={{ color: 'white' }}>
                                                                {selectedRestaurant.address}
                                                            </p>
                                                            <div className="info_profile">
                                                                <div className="info_profile_title source-sans-3-bold" style={{ color: 'white', fontSize: '1.2rem' }}>Price Range</div>
                                                            </div>
                                                            <p className="restaurant_wishlist_price">
                                                                {selectedRestaurant.priceRange}
                                                            </p>
                                                            <div className="info_profile">
                                                                <div className="info_profile_title source-sans-3-bold" style={{ color: 'white', fontSize: '1.2rem' }}>Contact Number</div>
                                                            </div>
                                                            <p className="restaurant_wishlist_price">
                                                                {selectedRestaurant.phone || "-"}
                                                            </p>
                                                            <div className="info_profile">
                                                                <div className="info_profile_title source-sans-3-bold" style={{ color: 'white', fontSize: '1.2rem' }}>Opening Hours</div>
                                                            </div>
                                                            <div className="opening_hour">
                                                                {Object.entries(selectedRestaurant?.openingHours || {}).map(([day, times], index) => (
                                                                    <div key={index} className="opening_hour_row">
                                                                        <div className="opening_hour_day">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                                                                        <div className="opening_hour_time">
                                                                            {times.length > 0 ? (
                                                                                times.map((time, idx) => (
                                                                                    <div key={idx}>
                                                                                        {time.open} - {time.close}
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                <span>Closed</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className='flex-center' style={{marginTop: '20px'}}>
                                                                <button className='btn_view' onClick={() => selectedRestaurant && handleClick(selectedRestaurant._id)}>View Details</button>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
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

const RestaurantItem = ({ imgSrc, name, desc, location, onSelect, onRemove, id, date }) => (

    <div className="restaurant_wishlist_item hover_style_3" onClick={onSelect}>
        <div className="restaurant_wishlist_item_body">
            <div className="restaurant_wishlist_item_info">
                <img src={imgSrc} alt={name} className="restaurant_wishlist_item_img" />
                <div className="restaurant_wishlist_item_details">
                    <h5>{name}</h5>
                    <p>{desc}</p>
                    <p className="restaurant_wishlist_location">{location}</p>
                    <p style={{ color: 'gray', fontSize: '0.85rem' }}>Saved at: {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
