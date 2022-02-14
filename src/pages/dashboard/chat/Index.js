import React, { useState, useEffect } from 'react'
import './style.scss'
import jwt_decode from 'jwt-decode'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import queryString from 'query-string'
import io from 'socket.io-client'
import UserList from '../../../components/UserList/Index'

let socket

const Index = () => {
    // const ENDPOINT = 'https://chat-x-api.herokuapp.com'
    const ENDPOINT = 'localhost:4000'
    const location = useLocation()
    const [isLoading, setLoading] = useState(true)
    const query = queryString.parse(location.search)
    const { register, handleSubmit, errors } = useForm()
    const [messages, setMessages] = useState([])
    const reciver = query.reciver
    const token = localStorage.getItem('token')
    const decode = jwt_decode(token)

    useEffect(() => {
        // setMessages([])
        if (reciver) {
            const room = {
                sender: decode.id,
                reciver: reciver
            }
            socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] })

            socket.emit("join", { room })
            socket.on("message", (data) => {
                console.log(data.message)
                // setMessages([...messages, data.message])
                setMessages((exMessage) => [...exMessage, data.message])
            })
        }
    }, [ENDPOINT, reciver])

    // Submit Message
    const onSubmit = async (data) => {
        const messageData = {
            sender: decode.id,
            reciver: reciver,
            message: data.message
        }

        // setMessages([...messages, messageData])

        setMessages((exMessage) => [...exMessage, messageData])
        socket.emit('message', messageData, (response) => {
            if (response) {
                console.log('Successfully message send');
            }
        })
    }


    // useEffect(() => {
    //     const data = {
    //         sender: decode.id,
    //         reciver: reciver
    //     }
    //     socket.emit('getmessage', data, (response) => {
    //         console.log(response);
    //         setMessages(response)
    //         setLoading(false)
    //     })
    // }, []);


    return (
        <div className="chat-room">
            <div className="d-flex">
                {/* Users List Container */}
                <div className="users-list-container border-right">
                    <UserList sender={reciver} />
                </div>

                {/* Message Container */}
                <div className="message-container flex-fill border-left p-4">

                    <div className="message-body">
                        {messages && messages.length > 0 ?
                            messages.map((item, i) =>
                                <div className={reciver === item.reciver ? "message text-right" : "message"} key={i} id="message">
                                    <p>{item.message}</p>
                                </div>
                            ) : null}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="d-flex">
                            <div className="flex-fill">
                                <input
                                    type="text"
                                    name="message"
                                    className={errors.message ? "form-control shadow-none border-danger" : "form-control shadow-none"}
                                    ref={register({ required: true })}
                                />
                            </div>
                            <div><button type="submit" className="btn btn-info shadow-none">Send</button></div>
                        </div>
                    </form>
                </div>
            </div>








            {/* <div className="container py-4">
                <div className="row">
                    <div className="col-12 col-lg-6 m-auto">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <p>Room <span className="text-success">{room}</span></p>

                                <div className="message-body">
                                    {messages && messages.length > 0 ?
                                        messages.map((items, i) =>
                                            <div className="message" key={i} id="message">
                                                <p>{items.message}</p>
                                            </div>
                                        ) : null}
                                </div>
                            </div>

                            <div className="card-footer bg-white">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="d-flex">
                                        <div className="flex-fill">
                                            <input
                                                type="text"
                                                name="message"
                                                className="form-control shadow-none"
                                                ref={register({ required: true })}
                                            />
                                        </div>
                                        <div><button type="submit" className="btn btn-info shadow-none">Send</button></div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <p>Task : RoomID will be concat with loggedin user ID (Own/Sender ID)</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Index;