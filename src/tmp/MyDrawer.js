import { useState } from 'react'
import '../css/nav.css'
import { Button } from '@mui/material';

const MyDrawer = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open); 
    };
    return (
        <>
            <div className={`side-bar${open ? '' : '-close'}`}>
                <p>휴가 신청</p>
                <p>휴가 조회</p>
            </div>
            <div className="button-wrapper">
                {open ? (<Button onClick={toggleDrawer}>close sidebar</Button>) : (<Button onClick={toggleDrawer}>open sidebar</Button>)}
            </div>
        </>
    );
};


export { MyDrawer }