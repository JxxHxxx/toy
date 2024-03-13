import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tab, Tabs } from '@mui/material';
import { Fragment } from 'react';
import PropTypes from 'prop-types';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0.5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const MenuTabs = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [logined, setLogined] = useState(sessionStorage.getItem('memberId') !== null);
    console.log('render', logined);

    const handleLogin = () => {
        setLogined(true);
    };

    const handleLogout = () => {
        sessionStorage.clear('memberId');
        setLogined(false);
    }
    
    useEffect(() => {
        
    }, [logined])

    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="휴가" component={Link} to="/vacations" {...a11yProps(0)} />
                    <Tab label="관리" component={Link} to="/adminstrations" {...a11yProps(1)} />
                </Tabs>
                <Box sx={{ marginRight: '25px', marginLeft: 'auto' }}>
                    {!logined && <Button onClick={handleLogin} component={Link} to="/login" variant="outlined" color="primary">Login</Button>}
                    {logined && <Button onClick={handleLogout} color="primary">logout</Button>}
                </Box>
            </Box>
            <CustomTabPanel value={value} index={0}> 
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            </CustomTabPanel>
        </Fragment>
    )
}