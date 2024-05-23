import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreatData() {
    const location = useLocation();
    const data = location.state?.data;

    const navigate = useNavigate();
    const handleBack=()=>{
        navigate('/', { state: { data: data ,user:location.state?.user} });
    }

    return (
        <div style={{ marginLeft: 20 ,marginTop:20 }}>
            <Button variant="contained" onClick={()=>handleBack()}>
                Back
            </Button>
        </div>
    )
}

export default CreatData