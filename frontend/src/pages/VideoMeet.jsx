import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client"

const server_url = "http://localhost:8000"

let connection = {}

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

const VideoMeet = () => {

    let socketRef = useRef();

    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(true);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(3);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    // step -1 
    const getPermission = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true })

            if (videoPermission) {
                setVideoAvailable(true)
            } else {
                setVideoAvailable(true)
            }

            console.log(videoPermission)

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true })

            if (audioPermission) {
                setAudioAvailable(true)
            } else {
                setAudioAvailable(true)
            }

            console.log(audioPermission)

            const mediaDevice = navigator.mediaDevices.getDisplayMedia

            if (mediaDevice) {
                setScreenAvailable(true)
            } else {
                setScreenAvailable(false)
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable })

                console.log(userMediaStream)

                if (userMediaStream) {
                    window.localStream = userMediaStream

                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream
                    }
                }
            }


        } catch (error) {
            console.log(error)
        }
    }

    // step - 2
    useEffect(() => {
        getPermission()
    }, [])

    // step-5
    const connectToSocketServer = () => {
        socketIdRef.current = io.connect(server_url, { secure: false })
    }

    // step-4
    const getMedia = () => {
        setVideo(videoAvailable)
        setAudio(audioAvailable)
        connectToSocketServer()
    }

    // step-3
    const connect = () => {
        setAskForUsername(false)
        getMedia()
    }

    const getUserMediaSuccess = () => {
        
    }

    const getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        }
    }

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia()
        }
    }, [video, audio])

    return (
        <div style={{ color: "red" }}>
            {
                askForUsername ?
                    <div>
                        <h2>Enter into Lobby </h2>
                        <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                        <Button variant="contained" onClick={connect}>Connect</Button>


                        <div>
                            <video ref={localVideoref} autoPlay muted></video>
                        </div>

                    </div> :
                    <div>Video call has started</div>
            }
        </div>
    )
}

export default VideoMeet