import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/home.module.css';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [error, setError] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        const code = meetingCode.trim();
        if (!code) {
            setError("Enter a meeting code to continue.");
            return;
        }
        try {
            await addToUserHistory(code)
            navigate(`/${code}`)
        } catch (err) {
            setError(err.response?.data?.message || "Could not join this room. Try again.");
        }
    }

    return (
        <>

            <div className={styles.homePage}>
            <header className={styles.navBar}>

                <div className={styles.brand}>
                    <span className={styles.brandMark}><VideoCallIcon /></span>
                    <div><span className={styles.brandName}>APNA<span>CALL</span></span><small>Simple video conversations</small></div>
                </div>

                <nav className={styles.navActions}>
                    <IconButton onClick={
                        () => {
                            navigate("/history")
                        }
                    } aria-label="View meeting history">
                        <RestoreIcon />
                        <span>History</span>
                    </IconButton>

                    <Button startIcon={<LogoutIcon />} onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }} className={styles.logoutButton}>
                        Logout
                    </Button>
                </nav>


            </header>


            <main className={styles.meetContainer}>
                <section className={styles.leftPanel}>
                    <span className={styles.eyebrow}>YOUR SPACE TO CONNECT</span>
                    <h1>Make room for<br /><em>better conversations.</em></h1>
                    <p className={styles.description}>Enter a meeting code and join your people, wherever they are.</p>

                    <div className={styles.joinCard}>
                        <div className={styles.inputRow}>
                            <TextField value={meetingCode} onChange={e => { setMeetingCode(e.target.value); setError("") }} onKeyDown={e => e.key === "Enter" && handleJoinVideoCall()} id="meeting-code" label="Meeting code" placeholder="e.g. 89076" variant="outlined" fullWidth />
                            <Button onClick={handleJoinVideoCall} variant='contained' endIcon={<ArrowForwardIcon />} disabled={!meetingCode.trim()}>Join room</Button>
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                    </div>

                    <div className={styles.quickNote}><span>●</span> Your room is private and secure</div>
                </section>
                <section className={styles.rightPanel}>
                    <div className={styles.illustrationGlow}></div>
                    <img src='/logo3.png' alt="People connecting on a video call" />
                    <div className={styles.statPill}><strong>01</strong><span>One link.<br />Everyone together.</span></div>
                </section>
            </main>
            </div>
        </>
    )
}


export default withAuth(HomeComponent)