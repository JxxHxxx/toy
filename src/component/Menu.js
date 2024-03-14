import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tab, Tabs } from '@mui/material';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../context/UserContext';


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
    const [TabPanel, setTabPanel] = useState(0);
    const { isLogin, setIsLogin } = useContext(AuthContext);

    const handleChange = (event, newValue) => {
        setTabPanel(newValue);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLogin(false);
    }

    useEffect(() => {
    }, [isLogin])

    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tabs value={TabPanel} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="휴가" component={Link} to="/vacations" {...a11yProps(0)} />
                    <Tab label="관리" component={Link} to="/adminstrations" {...a11yProps(1)} />
                </Tabs>
                <Box sx={{ marginRight: '25px', marginLeft: 'auto' }}>
                    {isLogin ? <Button onClick={handleLogout} component={Link} to="/login" variant="outlined" color="primary">logout</Button>
                        : <Button component={Link} to="/login" variant="outlined" color="primary">Login</Button>}
                </Box>
            </Box>
            <CustomTabPanel value={TabPanel} index={0}>
            </CustomTabPanel>
            <CustomTabPanel value={TabPanel} index={1}>
            </CustomTabPanel>
        </Fragment>
    )
}