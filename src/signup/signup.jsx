import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from "../apiUtil";
import {useState} from "react";
import {useForm} from "react-hook-form";
import { Link as RouterLink} from "react-router-dom";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp({setNewUser, setUser, newUser}) {

    const {register, handleSubmit, setError, formState: {errors}} = useForm();



    const handleSubmitButton = async (event) => {
        let response = await api.usersignup(event);
        if (response?.error_message) {
            setError('email', { type: 'error', message: response.error_message })
        }
        else {
            setUser(response);
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitButton)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    {...register("firstName", { required: "First Name is required." })}
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    {...register("lastName", { required: "Last Name is required." })}
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...register("email", { required: "Email Address is required.", pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        } })}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password", { required: "Password is required.", minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }})}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    fullWidth
                                    defaultValue="2017-05-24"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="date_of_birth"
                                    {...register("date_of_birth", { required: "Date Of Birth is required." })}
                                    error={Boolean(errors.date_of_birth)}
                                    helperText={errors.date_of_birth?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="city"
                                    label="City"
                                    id="city"
                                    autoComplete="city"
                                    {...register("city", { required: "City is required." })}
                                    error={Boolean(errors.city)}
                                    helperText={errors.city?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="state"
                                    label="State"
                                    id="state"
                                    autoComplete="state"
                                    {...register("state", { required: "State is required." })}
                                    error={Boolean(errors.state)}
                                    helperText={errors.state?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="country"
                                    label="Country"
                                    type="country"
                                    id="country"
                                    autoComplete="country"
                                    {...register("country", { required: "Country is required." })}
                                    error={Boolean(errors.country)}
                                    helperText={errors.country?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    required
                                    label="Profile"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    autoComplete="Profile"
                                    name="profile"
                                    {...register("profile", { required: "Profile is required." })}
                                    error={Boolean(errors.profile)}
                                    helperText={errors.profile?.message}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={() => setNewUser(!newUser)}>Already a user ?</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}