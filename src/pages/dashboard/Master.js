import React, { useState, useEffect } from 'react'
import './style.scss'
import { Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import ChatRoom from './chat/Index'
import Navbar from '../../components/Navbar/Index'

const Master = () => {
    const [user, setUser] = useState({})
    const token = localStorage.getItem('token')

    useEffect(() => {
        const decode = jwt_decode(token)
        setUser(decode)
    }, [token])



    return (
        <div>
            <Navbar user={user} />
            <div className="main">
                <Route exact path="/chat-room/" component={ChatRoom} />
            </div>
        </div>
    );
};

export default Master;