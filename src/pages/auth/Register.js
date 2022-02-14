import React, { useState } from 'react'
import './style.scss'
import Axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Images } from '../../utils/Images'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useHistory } from 'react-router-dom'

toast.configure({ autoClose: 2000 })
const Register = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm()
    const [isLogging, setLogging] = useState(false)


    // Submit Form
    const onSubmit = async (data) => {
        try {
            setLogging(true)
            const response = await Axios.post(`${api}auth/register`, data)
            if (response.status === 201) {
                setLogging(false)
                toast.success(response.data.message)
                history.push('/login')
            }

            if (response.status === 208) {
                setLogging(false)
                toast.error(response.data.message)
            }
        } catch (error) {
            if (error) {
                setLogging(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    return (
        <div className="auth">
            <div className="container-fluid">
                <div className="row">

                    {/* Content column */}
                    <div className="col-12 col-lg-7 d-none d-lg-block p-0">
                        <div className="content-container">
                            <div className="flex-center flex-column">
                                <div className="logo-container">
                                    <img src={Images.Logo} className="img-fluid" alt="..." />
                                </div>
                                <h2>কথা বলুন চিঠি'তে</h2>
                                <p>Connect with million friends.</p>

                                <ul>
                                    <li>
                                        <div className="image-container rounded-circle">
                                            <img src={Images.Image5} className="img-fluid" alt="..." />
                                        </div>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <div className="image-container rounded-circle">
                                            <img src={Images.Image1} className="img-fluid" alt="..." />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="image-container rounded-circle">
                                            <img src={Images.Image2} className="img-fluid" alt="..." />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="image-container rounded-circle">
                                            <img src={Images.Image3} className="img-fluid" alt="..." />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="image-container rounded-circle">
                                            <img src={Images.Image4} className="img-fluid" alt="..." />
                                        </div>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <div className="image-container rounded-circle">
                                            <img src={Images.Image5} className="img-fluid" alt="..." />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Form column */}
                    <div className="col-12 col-lg-5 py-3 credential-container">
                        <div className="flex-center flex-column">
                            <div className="card border-0">
                                <div className="d-lg-none">
                                    <img src={Images.Logo} className="img-fluid" alt="..." />
                                </div>
                                <h3 className="mb-4">Get Started!</h3>

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    {/* Username */}
                                    <div className="form-group mb-4">
                                        {errors.userName && errors.userName.message ? (
                                            <p className="text-danger">{errors.userName && errors.userName.message}</p>
                                        ) : <p>Username</p>
                                        }

                                        <input
                                            type="text"
                                            name="userName"
                                            className="form-control shadow-none"
                                            placeholder="Your username"
                                            ref={register({
                                                required: "Username is required",
                                            })}
                                        />
                                    </div>

                                    {/* E-mail */}
                                    <div className="form-group mb-4">
                                        {errors.email && errors.email.message ? (
                                            <p className="text-danger">{errors.email && errors.email.message}</p>
                                        ) : <p>E-mail</p>
                                        }

                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control shadow-none"
                                            placeholder="Enter e-mail"
                                            ref={register({
                                                required: "E-mail is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="form-group mb-4">
                                        {errors.password && errors.password.message ? (
                                            <p className="text-danger">{errors.password && errors.password.message}</p>
                                        ) : <p>Password</p>
                                        }

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control shadow-none"
                                            placeholder="Enter password"
                                            ref={register({
                                                required: "Please enter password",
                                                minLength: {
                                                    value: 8,
                                                    message: "Minimun length 8 character"
                                                }
                                            })}
                                        />
                                    </div>


                                    <div className="d-flex">
                                        <div>
                                            <Link to="/">Already registered ? Login</Link>
                                            <br />
                                            <Link to="/reset">Forgot password ?</Link>
                                        </div>
                                        <div className="ml-auto">
                                            <button type="submit" className="btn shadow-none" disabled={isLogging}>
                                                {isLogging ? <span>Loading...</span> : <span>Register</span>}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;