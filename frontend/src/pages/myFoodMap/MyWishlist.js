import React, { useState } from 'react';
import './RestaurantWishlist.css'; // Custom CSS

const RestaurantWishlist = ({ onRemove, }) => {
    const restaurants = [
        {
            imgSrc: 'https://via.placeholder.com/100',
            name: 'La Piazza',
            desc: 'Authentic Italian cuisine with fresh ingredients.',
            location: '123 Main Street, New York, NY',
            price: '$20 per person'
        },
        {
            imgSrc: 'https://via.placeholder.com/100',
            name: 'Sushi Haven',
            desc: 'Fresh sushi and Japanese delicacies.',
            location: '456 Elm Street, San Francisco, CA',
            price: '$30 per person'
        },
        {
            imgSrc: 'https://via.placeholder.com/100',
            name: 'Taco Fiesta',
            desc: 'Mexican street food with a modern twist.',
            location: '789 Oak Avenue, Austin, TX',
            price: '$15 per person'
        }
    ];


    // Handlers for removing an item and checking out
    const handleRemove = (index) => {
        console.log(`Removing restaurant at index ${index}`);
    };

    const [selectedRestaurant, setSelectedRestaurant] = useState('');

    const handleSelectRestaurant = (restaurant) => {
        setSelectedRestaurant(restaurant);
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
                                            Restaurant Wishlist
                                        </h5>
                                        <hr />

                                        <div className="restaurant_wishlist_header">
                                            <div>
                                                {/* <p className="restaurant_wishlist_title">Restaurant Wishlist</p> */}
                                                <p className="restaurant_wishlist_subtitle">
                                                    You have {restaurants.length} {restaurants.length === 1 ? "restaurant" : "restaurants"} in your wishlist
                                                </p>
                                            </div>
                                        </div>

                                        {/* List of restaurants */}
                                        {restaurants.map((restaurant, index) => (
                                            <RestaurantItem
                                                key={index}
                                                imgSrc={restaurant.imgSrc}
                                                name={restaurant.name}
                                                desc={restaurant.desc}
                                                location={restaurant.location}
                                                price={restaurant.price}
                                                onRemove={() => onRemove(index)}
                                                onSelect={() => handleSelectRestaurant(restaurant)} // Handle restaurant click
                                            />
                                        ))}
                                    </div>

                                    <div className="restaurant_wishlist_right_col">
                                        <div className="restaurant_wishlist_payment_card">
                                            <h5 className="mb-0">Restaurant details</h5>
                                            <div className="restaurant_wishlist_summary">
                                                <div className="restaurant_wishlist_summary_row">
                                                    {/* <p>Total (Incl. taxes)</p>
                                                    <p>{total}</p> */}
                                                    {!selectedRestaurant ?
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
                                                            <img src={`${process.env.PUBLIC_URL}/images/click.png`}></img>
                                                            <p>Click on the restaurant to see the details</p>
                                                        </div>

                                                        : <div>
                                                            <img src={selectedRestaurant.imgSrc} alt={selectedRestaurant.name} className="restaurant_wishlist_detail_img" />
                                                            <h5>{selectedRestaurant.name}</h5>
                                                            <p>{selectedRestaurant.desc}</p>
                                                            <p className="restaurant_wishlist_location">
                                                                {selectedRestaurant.location}
                                                            </p>
                                                            <p className="restaurant_wishlist_price">
                                                                Price: {selectedRestaurant.price}
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            {/* <button className="restaurant_wishlist_checkout_btn" onClick={onCheckout}>
                                                <span>{total}</span>
                                                <span>Checkout <i className="restaurant_wishlist_arrow_right"></i></span>
                                            </button> */}
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

const RestaurantItem = ({ imgSrc, name, desc, location, price, onRemove, onSelect }) => (
    <div className="restaurant_wishlist_item hover_style_3" onClick={onSelect}>
        <div className="restaurant_wishlist_item_body">
            <div className="restaurant_wishlist_item_info">
                <img src={imgSrc} alt={name} className="restaurant_wishlist_item_img" />
                <div className="restaurant_wishlist_item_details">
                    <h5>{name}</h5>
                    <p>{desc}</p>
                    <p className="restaurant_wishlist_location">{location}</p>
                </div>
            </div>
            <div className="restaurant_wishlist_item_actions">
                <span>{price}</span>
                <i className="restaurant_wishlist_trash_icon" onClick={onRemove}></i>
            </div>
        </div>
    </div>
);

export default RestaurantWishlist;
