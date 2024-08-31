import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 130,
    valueFormatter: ({ value }) => `RM${value}`, // Format price with currency
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 130,
    renderCell: (params) => (
      <img src={params.value} alt={params.row.name} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
    ),
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 100,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleEdit(params.row.id)}
      >
        Edit
      </Button>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 100,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDelete(params.row.id)}
      >
        Delete
      </Button>
    ),
  },
];

const rows = [
  { id: 1, name: 'Burger', price: 12.99, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Pizza', price: 19.99, image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Pasta', price: 15.49, image: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Salad', price: 9.99, image: 'https://via.placeholder.com/100' },
  { id: 5, name: 'Sushi', price: 24.99, image: 'https://via.placeholder.com/100' },
];

const handleEdit = (id) => {
  console.log(`Edit item with ID: ${id}`);
  // Implement edit functionality here
};

const handleDelete = (id) => {
  console.log(`Delete item with ID: ${id}`);
  // Implement delete functionality here
};

export default function PlaceProfileFoodMenuTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
