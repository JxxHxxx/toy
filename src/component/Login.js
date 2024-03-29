import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postSignIn } from '../api/LoginApi';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/UserContext';
import { useEffect } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const { setIsLogin } = useContext(AuthContext);

    // URL 로 로그인 컴포넌트 접근 시 처리
    useEffect(() => {
        if (sessionStorage.getItem('memberId') !== null) {
            setIsLogin(true);
            navigate("/vacations", { state: { memberId: sessionStorage.getItem('memberId') } });
        }
    }, []); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginForm = {
            memberId: data.get('memberId'),
            password: data.get('password')
        }
        
        const res = await postSignIn(loginForm);

        if (res.status === 200) {
            sessionStorage.setItem('companyId', res.data.companyId);
            sessionStorage.setItem('companyName', res.data.companyName);
            sessionStorage.setItem('departmentId', res.data.departmentId);
            sessionStorage.setItem('departmentName', res.data.departmentName);
            sessionStorage.setItem('name', res.data.name);
            sessionStorage.setItem('memberId', res.data.memberId);
            setIsLogin(true);
            navigate("/vacations", { state: { memberId: loginForm.memberId } })
        }
        else {
            alert('비밀번호 틀림');
        }
    }

    return (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="memberId"
                                label="Member ID"
                                name="memberId"
                                autoComplete="memberId"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onSubmit={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
    );
}