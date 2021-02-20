import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'
import Axios from 'axios'
import { api } from '../../utils/api'
import { Icon } from 'react-icons-kit'
import { useHistory } from 'react-router-dom'
import { iosChatbubbleOutline } from 'react-icons-kit/ionicons'

const Index = () => {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)

    // get users
    const getUsers = useCallback(async () => {
        try {
            const response = await Axios.get(`${api}users`)
            if (response.status === 200) {
                setUsers(response.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        } catch (error) {
            if (error) console.log(error.response)
        }
    }, [])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    // Go to chat room
    const goChatRoom = user => {
        let name
        name = user.name.replace(/ /g, "-")
        history.push(`/chat-room/${name}/${user.id}`)
    }

    // Split Name
    const splitName = name => {
        let fullName
        let firstName
        let lasttName
        let shortName

        fullName = name.split([' '])
        firstName = fullName[0]
        lasttName = fullName[1]

        return shortName = firstName.charAt(0) + lasttName.charAt(0)
    }


    return (
        <div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 col-lg-6 m-auto">
                        {isLoading ?

                            // Pre loading
                            <div className="card border-0 shadow-sm p-4 loading">
                                <p className="mb-0">Loading...</p>
                            </div>
                            :

                            // Users List
                            <div className="card border-0 shadow-sm">
                                {users && users.length ?
                                    users.map((user, i) =>

                                        <div className="user border-bottom d-flex" key={i} onClick={() => goChatRoom(user)}>
                                            <div className="img-container rounded-circle">
                                                <h6 className="mb-0 text-uppercase">{splitName(user.name)}</h6>
                                            </div>
                                            <div className="name-container pl-3">
                                                <p className="text-capitalize mb-0">{user.name}</p>
                                            </div>
                                            <div className="ml-auto pt-1">
                                                <Icon icon={iosChatbubbleOutline} size={25} />
                                            </div>
                                        </div>

                                    ) : null}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;