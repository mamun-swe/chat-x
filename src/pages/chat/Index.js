import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import io from 'socket.io-client'
let socket

const Index = () => {
    const { register, handleSubmit, errors } = useForm()
    const [messages, setMessages] = useState([])
    let { name, id } = useParams()
    const room = id
    // const ENDPOINT = 'localhost:4000'
    const ENDPOINT = 'https://chat-x-api.herokuapp.com'

    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] })

        socket.emit("join", { name, room })
        socket.on("message", (message) => {
            setMessages((exMessage) => [...exMessage, message])
        })
    }, [name, room, ENDPOINT])


    // Submit Message
    const onSubmit = async (data, event) => {
        const messageData = { message: data.message, room: room }

        setMessages((exMessage) => [...exMessage, messageData])

        socket.emit('message', messageData, (response) => {
            if (response) {
                console.log('Successfully message send');
            }
        })
    }


    return (
        <div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 col-lg-6 m-auto">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <div className="d-flex">
                                    <div><p>Sender <span className="text-success">{name.replace(/-/g, " ")}</span></p></div>
                                    <div className="ml-auto"><p>Room <span className="text-success">{room}</span></p></div>
                                </div>

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
            </div>
        </div>
    );
};

export default Index;