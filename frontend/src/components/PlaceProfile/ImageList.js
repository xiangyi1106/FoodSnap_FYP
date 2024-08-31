import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMediaQuery } from 'react-responsive';
import Pagination from '@mui/material/Pagination';

export default function MasonryImageList() {
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

  const cols = query564px ? 1 : query769px ? 2 : 3;

  // Calculate the items to display for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = itemData.slice(startIndex, endIndex);

  return (
    // <Box sx={{ width: '100%', height: 450, overflowY: 'scroll' }}>
    <Box sx={{ width: '100%' }}>
      <ImageList variant="masonry" cols={cols} gap={8}>
        {currentItems.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
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
    </Box>
  );
}

const itemData = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWZ5IYfEczUFQvL-cPAOjwYKHiFkkda5muw&s',
    title: 'Bed',
  },
  {
    img: 'https://www.tribus.com.my/faci/faci002.jpg',
    title: 'Books',
  },
  {
    img: 'https://www.tribus.com.my/img/bg01.jpg',
    title: 'Sink',
  },
  {
    img: 'https://fastly.4sqi.net/img/general/600x600/564566936_k16QklEvjCiTUQnPGcNW9EcYgz3EG0sVGzCqAT8rEvg.jpg',
    title: 'Kitchen',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIVumjW5PQ7WGl1w4QBy14tEEphlrhGTXRig&s',
    title: 'Blinds',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6nHHJ3B_UUU7tw-38BCe-h52RHkJn9rjvKw&s',
    title: 'Chairs',
  },
  // {
  //   img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoaAvjtbLmXGnbXJT1e8SNWSIEbwOZ7OUQKA&s',
  //   title: 'Laptop',
  // },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykOSL5EmnZ6pAG7R_2HdQrnk_NFtFhXqejw&s',
    title: 'Doors',
  },
  // {
  //   img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
  //   title: 'Coffee',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
  //   title: 'Storage',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
  //   title: 'Candle',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
  //   title: 'Coffee table',
  // },
];
