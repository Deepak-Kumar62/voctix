import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className='landingpage-container'>
            <nav>
                <div>
                    <h2>Voctix</h2>
                </div>
                <div className='navlist'>
                    <p>Join a call</p>
                    <p>Sigin</p>
                    <p>Signup</p>
                </div>
            </nav>
            <div className='landingpage-main-container'>
                <div>
                    <h3><span style={{ color: "#FF9839" }}>Connect</span> with your loved ones.</h3>
                    <p>Cover a distance by Voctix Video Call</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="/mobile.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage