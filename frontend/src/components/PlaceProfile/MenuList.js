import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
// import './MenuList.css';  // Import the CSS file
import { useMediaQuery } from "react-responsive";
import Pagination from '@mui/material/Pagination';

export default function MenuList() {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 12;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const query769px = useMediaQuery({
    query: "(max-width: 769px)",
  });

  const query564px = useMediaQuery({
    query: "(max-width: 564px)",
  });

  const cols = query564px ? 1 : query769px ? 2 : 4;

  // Calculate the items to display for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = itemData.slice(startIndex, endIndex);

  return (
    <div>
      <ImageList sx={{ width: "100%" }} cols={cols} gap={8}>
        {currentItems.map((item) => (
          <ImageListItem key={item.img} className="menu-item">
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={<span className='menu_name source-sans-3-bold'>{item.title}</span>}
              subtitle={<span className="menu_price">{item.price}</span>}
              position="below"
              className="item-bar"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Pagination
        count={Math.ceil(itemData.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </div>
  );
}

const itemData = [
  {
    img: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg',
    title: 'Classic Burger',
    price: 'RM 12.99',
  },
  {
    img: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg',
    title: 'Pasta Carbonara',
    price: 'RM 14.99',
  },
  {
    img: 'https://assets.bonappetit.com/photos/624215f8a76f02a99b29518f/1:1/w_2800,h_2800,c_limit/0328-ceasar-salad-lede.jpg',
    title: 'Caesar Salad',
    price: 'RM 9.99',
  },
  {
    img: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza-500x500.jpg',
    title: 'Margherita Pizza',
    price: 'RM 11.99',
  },
  {
    img: 'https://www.thespruceeats.com/thmb/HgM2h42z1HGEcSWkWk5CgAjDDpQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-grill-salmon-2216658-hero-01-a9c948f8a238400ebaafc0caf509c7fa.jpg',
    title: 'Grilled Salmon',
    price: 'RM 17.99',
  },
  {
    img: 'https://sugargeekshow.com/wp-content/uploads/2023/10/easy_chocolate_cake_slice-500x375.jpg',
    title: 'Chocolate Cake',
    price: 'RM 6.99',
  },
  {
    img: 'https://www.woolworths.co.nz/Content/Recipes/230232-Classic-SpagBol_810x520.jpg',
    title: 'Spaghetti Bolognese',
    price: 'RM 13.99',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHg1mdvFz8NzKX3Ne5FzJ1luLZ8K8uAO3UyA&s',
    title: 'Fish Tacos',
    price: 'RM 10.99',
  },
  {
    img: 'https://groundbeefrecipes.com/wp-content/uploads/double-bacon-cheeseburger-recipe-6.jpg',
    title: 'Cheeseburger',
    price: 'RM 11.49',
  },
  {
    img: 'https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg',
    title: 'Veggie Burger',
    price: 'RM 10.99',
  },
  {
    img: 'https://www.thespruceeats.com/thmb/DTkCRqNWiK8HmlAANacYhMLhN9E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/strawberry-breakfast-smoothie-recipe-2097149-hero-02-5c1d4b2a46e0fb00014bf2ec.jpg',
    title: 'Fruit Smoothie',
    price: 'RM 5.49',
  },
  {
    img: 'https://preppykitchen.com/wp-content/uploads/2022/09/Chicken-Wings-Recipe-Card.jpg',
    title: 'Chicken Wings',
    price: 'RM 8.99',
  },
];
