import "./style.css";
import RestaurantWishlist from './MyWishlist';
export default function MyFoodMap({user}) {
    return (
        <div className=' myWishlist'>
            <RestaurantWishlist user={user}/>
        </div>
    );
}
