import React, { useState } from 'react';
import CenteredTabs from './CenteredTabs'; // Ensure file name is correctly capitalized
import VisitedPlacesTimeline from './VisitedPlacesTimeline';
import WishlistPage from './WishListPlace';
import AddWishlistModal from './AddWishlistModal';

function MyFoodMapContainer() { // Function declaration should not have parentheses

    const [currentTab, setCurrentTab] = useState('wishlistPlace');

    const tabsData = [
        { label: "Wishlist Place", value: 'wishlistPlace' },
        { label: "Visited Place", value: 'visitedPlace'},
    ];

    const wishlist = [
        {
          "id": "1",
          "name": "The Tribus Restaurant",
          "location": "28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor",
          "type": "Restaurant",
          "thumbnail": "https://example.com/images/cafe-delights.jpg",
          "source": "Post",
          "postId": "45",
          "detailsUrl": "https://example.com/posts/45"
        },
        {
          "id": "2",
          "name": "Sushi Haven",
          "location": "456 Sushi St, Roll City",
          "type": "Restaurant",
          "thumbnail": "https://example.com/images/sushi-haven.jpg",
          "source": "Restaurant Page",
          "detailsUrl": "https://example.com/restaurants/sushi-haven"
        },
        {
          "id": "3",
          "name": "Italian Bistro",
          "location": "789 Pasta Ave, Noodle Town",
          "type": "Restaurant",
          "thumbnail": "https://example.com/images/italian-bistro.jpg",
          "source": "Post",
          "postId": "78",
          "detailsUrl": "https://example.com/posts/78"
        },
        {
          "id": "4",
          "name": "Veggie Paradise",
          "location": "101 Green Road, Veggie City",
          "type": "Cafe",
          "thumbnail": "https://example.com/images/veggie-paradise.jpg",
          "source": "Restaurant Page",
          "detailsUrl": "https://example.com/restaurants/veggie-paradise"
        }
      ]
      

      const places = [
        {
            id: 1,
            location: 'The Rustic Cafe',
            date: '2024-08-10',
            snippet: 'A charming cafe with a cozy atmosphere and delicious pastries. Highly recommend the blueberry muffins!',
            onViewPost: (id) => console.log(`Viewing post ${id}`),
        },
        {
            id: 2,
            location: 'Gastronomy Haven',
            date: '2024-07-15',
            snippet: 'Fantastic experience with innovative dishes and great service. The truffle pasta was a highlight!',
            onViewPost: (id) => console.log(`Viewing post ${id}`),
        },
        {
            id: 3,
            location: 'Sushi Delight',
            date: '2024-06-25',
            snippet: 'Fresh and tasty sushi with a wide variety of rolls. The sushi platter is definitely worth trying.',
            onViewPost: (id) => console.log(`Viewing post ${id}`),
        },
        {
            id: 4,
            location: 'BBQ Paradise',
            date: '2024-05-30',
            snippet: 'Great BBQ spot with a smoky atmosphere. The ribs are fall-off-the-bone tender and the sides complement perfectly.',
            onViewPost: (id) => console.log(`Viewing post ${id}`),
        },
        {
            id: 5,
            location: 'Vegan Delights',
            date: '2024-04-20',
            snippet: 'Amazing vegan options with creative dishes. Loved the jackfruit tacos and the coconut curry.',
            onViewPost: (id) => console.log(`Viewing post ${id}`),
        },
        {
            id: 6,
            location: 'Dessert Oasis',
            date: '2024-03-15',
            snippet: 'Sweet treats galore! The chocolate lava cake is a must-try, and the ambiance is perfect for a relaxing afternoon.',
            onViewPost: (id) => console.log(`Viewing post ${id}`),
        },
        {
            id: 7,
            location: 'Noodle House',
            date: '2024-02-10',
            snippet: 'Delicious noodles and great broth. The ramen is flavorful and the dumplings are a perfect side dish.',
            onViewPost: (id) => console.log(`Viewing post ${id}`),
        },
        {
            id: 8,
            location: 'Grill & Chill',
            date: '2024-01-05',
            snippet: 'Excellent place for a casual meal. The grilled chicken and burgers are top-notch, and the atmosphere is laid-back.',
            onViewPost: (id) => console.log(`Viewing post ${id}`),
        },
    ];
    

    return (
        <div>
            {/* <CenteredTabs tabs={tabsData} currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === 'visitedPlace' && <VisitedPlacesTimeline places={places} />}
            {currentTab === 'wishlistPlace' && <WishlistPage wishlist={wishlist}/>} */}
            <WishlistPage wishlist={wishlist}/>
        </div>
    );
}

export default MyFoodMapContainer; // Export the function, not the call
