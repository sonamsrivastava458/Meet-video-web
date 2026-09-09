import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import styles from '../styles/authentication.module.css';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async (event) => {
        event.preventDefault();
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password)


            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            setError(err.response?.data?.message || "Authentication failed. Please try again.");
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" className={styles.authPage}>
                <CssBaseline />
                <Grid
                    size={{ xs: 0, sm: 5, md: 6 }}
                    className={styles.brandPanel}
                />
                <Grid size={{ xs: 12, sm: 7, md: 6 }} component={Paper} elevation={0} square className={styles.formPanel}>
                    <Box className={styles.formBox}>
                        <div className={styles.mobileBrand}>APNA<span>CALL</span></div>
                        <Avatar className={styles.lockAvatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <div className={styles.formIntro}>
                            <span className={styles.kicker}>WELCOME BACK</span>
                            <h1>{formState === 0 ? "Sign in to your account" : "Create your account"}</h1>
                            <p>{formState === 0 ? "Continue your conversations from anywhere." : "Start making better video calls today."}</p>
                        </div>

                        <div className={styles.authSwitch}>
                            <button className={formState === 0 ? styles.activeSwitch : ''} onClick={() => { setFormState(0); setError('') }}>Sign in</button>
                            <button className={formState === 1 ? styles.activeSwitch : ''} onClick={() => { setFormState(1); setError('') }}>Sign up</button>
                        </div>

                        <Box component="form" noValidate className={styles.authForm} onSubmit={handleAuth}>
                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Full Name"
                                name="username"
                                value={name}
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            /> : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoComplete="username"
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
                                autoComplete={formState === 0 ? "current-password" : "new-password"}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{ endAdornment: <InputAdornment position="end"><IconButton type="button" onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="Toggle password visibility">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                            />

                            {error && <p className={styles.errorMessage}>{error}</p>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={styles.submitButton}
                            >
                                {formState === 0 ? "Sign in" : "Create account"}
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