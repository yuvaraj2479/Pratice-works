import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';


import TableGrid from './TableGrid';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300
  },
  container: {
    marginLeft: 80

  },

}));


function Dropdown() {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState([]);


  const location = useLocation();
  const data = location.state?.data;


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Your code to handle page refresh
      // For example:
      console.log('Page is refreshing...');
      // You can also perform additional actions here, such as saving data
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  useEffect(() => {
   
     if(data&&data.length>=1){

       setSelectedOptions(data)
     }

  }, []);


  // Function to empty the 'data' variable
const emptyData = () => {
  // Assign an empty array to 'data'
  location.state.data = [];
};

// Call emptyData function when you want to empty 'data'



 

  const handleChange = (event) => {

    setSelectedUser('')

    setSelectedOptions(event.target.value);
  };



  const options = ['John Doe', 'Jane Smith', 'Alice Johnson'];



  const [selectedUser, setSelectedUser] = useState(null);


  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Select User</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableGrid selectedOptions={selectedOptions} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />


    </div>
  );
}

export default Dropdown;
