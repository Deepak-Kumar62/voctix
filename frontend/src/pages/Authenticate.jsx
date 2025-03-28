import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import AuthContext from '../contexts/AuthContext';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authenticate() {

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [firstname, setFirstname] = React.useState();
    const [lastname, setLastname] = React.useState();

    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false)

    const { handleLogin, handleRegister } = React.useContext(AuthContext)

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin({ username, password })
            }

            if (formState === 1) {
                let message = await handleRegister({ firstname, lastname, username, password });
                setMessage(message);

                setUsername("");
                setPassword("")
                setFirstname("")
                setLastname("")
                setOpen(true);
                setError("")
                setFormState(0)
            }
        } catch (err) {

            console.log(err);
            // let message = (err.response.data.message);
            setError(err.message);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://media.istockphoto.com/id/2154184023/photo/young-female-on-online-therapy-with-psychologist-psychotherapist.webp?a=1&b=1&s=612x612&w=0&k=20&c=yKeWw0R3XlDD0kGVRbEFN6aEy4hGsZLePq96VyCJ19E=)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>


                        <div>
                            <Button variant={formState === 0 ? "contained" : ""} onClick={() => { setFormState(0) }}>
                                Sign In
                            </Button>
                            <Button variant={formState === 1 ? "contained" : ""} onClick={() => { setFormState(1) }}>
                                Sign Up
                            </Button>
                        </div>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstname"
                                label="Firstname"
                                name="firstname"
                                value={firstname}
                                autoFocus
                                onChange={(e) => setFirstname(e.target.value)}
                            /> : <></>}

                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastname"
                                label="Lastname"
                                name="lastname"
                                value={lastname}
                                autoFocus
                                onChange={(e) => setLastname(e.target.value)}
                            /> : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}

                                id="password"
                            />

                            <p style={{ color: "red" }}>{error}</p>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}

                            >
                                {formState === 0 ? "Login " : "Register"}
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />

        </ThemeProvider>
    );
}