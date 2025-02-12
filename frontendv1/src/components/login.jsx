// Import necessary libraries and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { loginApi } from '../api/authapi';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(''); // Clear previous errors
        try {
            // Call the login API endpoint
            const response = await loginApi({ username, password });
            if(response.detail.status === "success")
                navigate('/admindashboard');
            else
                alert("Login failed. Please check your credentials and try again.");
            
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please try again.');
        }
    };

    return (
        <Container
            maxWidth="xs"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                Vishruta 2 Dashboard
            </Typography>

            {error && (
                <Typography color="error" style={{ marginBottom: '1rem' }}>
                    {error}
                </Typography>
            )}

            <Box
                component="form"
                noValidate
                autoComplete="off"
                style={{ width: '100%' }}
            >
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '1.5rem' }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <div style={{display:"flex", justifyContent:"right", marginTop:"20px"}}>Back to Vishrutha Page &nbsp; <a href='/'>click here</a></div>
            </Box>
        </Container>
    );
};

export default Login;