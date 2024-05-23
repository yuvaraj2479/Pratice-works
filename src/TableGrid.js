import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useLocation } from 'react-router-dom';

function TableGrid(props) {
  const users = [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "products": [
        {
          "id": 101,
          "name": "Product 1",
          "price": 20.99,
          "category": "Material"
        },
        {
          "id": 102,
          "name": "Product 2",
          "price": 15.49,
          "category": "Car Accessories"
        },
      ]
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "age": 25,
      "products": [
        {
          "id": 101,
          "name": "Product 4",
          "price": 8.99,
          "category": "FootWear Shop"
        },
        {
          "id": 102,
          "name": "Product 5",
          "price": 22.49,
          "category": "Laptop"
        },
      ]
    },
    {
      "id": 3,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "age": 35,
      "products": [
        {
          "id": 101,
          "name": "Product 8",
          "price": 77.99,
          "category": "Electronics"
        },
        {
          "id": 102,
          "name": "Product 9",
          "price": 66.49,
          "category": "Clothing"
        },
      ]
    }
  ];



  const location = useLocation();

  const userval = location.state?.user

  useEffect(() => {
    if (userval && userval.length !== 0) {
      props.setSelectedUser(userval)
    }

  }, [userval])

  const columnKeys = Object.keys(users[0]).filter(key => key !== "products");


  // Filter users based on the selected options passed from App component
  const filteredUsers = props.selectedOptions.length === 0 ? users : users.filter(user => props.selectedOptions.includes(user.name));

  const rows = filteredUsers.map(user => {
    const row = {};
    columnKeys.forEach(key => {
      row[key] = user[key];
    });
    return row;
  });


  const productcolumnkey = users.map((productkey => Object.keys(productkey.products[0])))




  const productdata = users.map(productdata => productdata.id === props.selectedUser ? productdata.products : '').filter(Boolean).flat()

  const productrow = productdata.map(user => {
    const row = {};
    productcolumnkey[0].forEach(key => {
      row[key] = user[key];
    });
    return row;
  });


  const [selectProduct, setSelectProduct] = useState(null)

  const navigate = useNavigate();

  const handleproduct = (params) => {
    setSelectProduct(params.row.id)
    navigate('/createdata', { state: { data: props.selectedOptions, user: props.selectedUser } });
  }




  return (
    <div style={{ height: 300, width: '100%' }}>
      <div style={{ marginTop: 2 }}>
        <DataGrid
          columns={[
            {
              field: 'radioButton',
              headerName: 'Select',
              sortable: false,
              width: 100,
              renderCell: (params) => (
                <input
                  type="radio"
                  name="selectedUser"
                  checked={props.selectedUser === params.row.id}
                  onChange={() => props.setSelectedUser(params.row.id)}
                />
              ),
            },
            ...columnKeys.map(key => ({
              field: key,
              headerName: key.charAt(0).toUpperCase() + key.slice(1),
              flex: 1,
            })),

          ]}
          rows={rows}
          pageSize={5}
        />
      </div>
      {
        props.selectedUser !== '' && props.selectedUser !== null ?
          <>
            <div style={{ marginTop: 10 }}>
              <DataGrid
                columns={[
                  {
                    field: 'radioButton',
                    headerName: 'Select',
                    sortable: false,
                    width: 100,
                    renderCell: (params) => (
                      <input
                        type="radio"
                        name="selectedUser"
                        checked={selectProduct === params.row.id}
                        onChange={(e) => handleproduct(params)}
                      />
                    ),
                  },
                  ...productcolumnkey[0].map(key => ({
                    field: key,
                    headerName: key.charAt(0).toUpperCase() + key.slice(1),
                    flex: 1,
                  })),

                ]}
                rows={productrow}
                pageSize={5}
              />
            </div>
          </> : <></>
      }


    </div>
  );
}

export default TableGrid;
