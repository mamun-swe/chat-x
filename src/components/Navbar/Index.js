import React, { useState } from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import { useHistory } from 'react-router-dom'
import { ic_power_settings_new } from 'react-icons-kit/md'
import { DropdownButton, Dropdown } from 'react-bootstrap'

const Index = ({ user }) => {
    const history = useHistory()
    const [isLoading, setLoading] = useState(false)

    // Split Name
    const splitName = name => {
        if (name) {
            let shortName
            shortName = name.charAt(0)
            return shortName
        }
    }

    // Logout
    const doLogout = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            localStorage.clear()
            history.push('/')
        }, 1000);
    }

    return (
        <div className="custom-navbar shadow-sm">
            <div className="d-flex flex-row-reverse">

                {/* Dropdown */}
                <div className="ml-2">
                    <DropdownButton
                        title=""
                        className="shadow-none">
                        <Dropdown.Item
                            onClick={doLogout}
                            disabled={isLoading}
                        >
                            <Icon icon={ic_power_settings_new} className="icon" size={20} />
                            {isLoading ? 'Logging out...' : 'Logout'}
                        </Dropdown.Item>
                    </DropdownButton>
                </div>

                {/* Image container */}
                <div className="img-container rounded-circle">
                    <div className="flex-center flex-column">
                        <h6 className="text-uppercase mb-0">{splitName(user.userName)}</h6>
                    </div>
                </div>

                {/* Name container */}
                <div className="name-container mr-2">
                    <p className="text-capitalize mb-0">{user.userName}</p>
                </div>

            </div>
        </div>
    );
};

export default Index;