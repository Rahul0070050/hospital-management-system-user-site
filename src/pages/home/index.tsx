import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toJpeg } from 'html-to-image'
import Footer from '../../components/footer'
import { orderInfo, paymentInfo } from '../../types/rasorpay'
import { doPaymentWithRazorpay } from '../../utils/rasorpay'
import { request } from '../../utils/request'
import { couponData, couponDataErroe } from '../../types/user'

import './style.scss'

function Home() {
    const [userData, setUserData] = useState<couponData>({ email: '', firstName: '', lastName: '' })
    const [userDataError, setUserDataError] = useState<couponDataErroe>({ email: false, firstName: false, lastName: false })
    const [token, settoken] = useState(() => {
        let data = localStorage.getItem('hms-token')
        if (data) {
            const {tokenNumber, exp} = JSON.parse(data)
            console.log(JSON.parse(data));
            
            return {tokenNumber, exp}
        } else {
            return { tokenNumber: null, exp: null }
        }
    })

    function submitHandler(e: FormEvent) {
        e.preventDefault()

        if (userData.email === '') setUserDataError(prev => { return { ...prev, email: true } })
        else setUserDataError(prev => { return { ...prev, email: false } })

        if (userData.firstName === '') setUserDataError(prev => { return { ...prev, firstName: true } })
        else setUserDataError(prev => { return { ...prev, firstName: false } })

        if (userData.lastName === '') setUserDataError(prev => { return { ...prev, lastName: true } })
        else setUserDataError(prev => { return { ...prev, lastName: false } })

        if (userData.firstName === '' || userData.lastName === '' || userData.email === '') return

        request.get('/user/register-card').then(res => {
            doPaymentWithRazorpay(res.data).then(result => {
                registerPayment(result)
            })
        })

        function registerPayment(payment: paymentInfo) {
            request.post('/user/register-card', {
                payment,
                userData
            }).then(res => {
                console.log(res.data.result.tokenNumber);
                localStorage.setItem('hms-token', JSON.stringify(res.data.result))
                settoken({ tokenNumber: res.data.result.tokenNumber, exp: res.data.result.exp })
                setUserData({ email: '', firstName: '', lastName: '' })
            }).catch(err => {
                console.log(err);
            })
        }

    }

    function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
        setUserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function sendCoupanToEmail() {
        toJpeg(document.getElementById('RC-coupon') as HTMLElement).then(function (dataUrl) {
            console.log(dataUrl);
        });

    }
    return (
        <>
            <div className='home'>
                <div className="info">
                    <h1><strong>Helth CR</strong></h1>
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At quaerat accusamus ex ullam impedit sapiente error, laboriosam nostrum, mollitia tempora officiis qui adipisci itaque id ducimus rerum. Mollitia, voluptatibus laboriosam.</span><br />
                    <button className='mr-4 text-light'><a href="#register" className='text-light'>Register</a></button>
                    <button><a href="#show-RC" className='text-light'>show RC</a></button>
                </div>
            </div>
            <div className="facility container-fluid p-5">
                <div className="heading ml-5 text-light">
                    Facilities
                </div>

                <div className="row m-3 d-flex justify-content-around">

                    <div className="card m-3" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">24X7 Pharmacy</h5>
                            <div className="d-flex text">
                                <p className="card-text" >24 Hours Emergency & Level 1 Trauma Services with state of art emergency unit with dedicated triage area trauma...</p>
                            </div>
                        </div>
                    </div>

                    <div className="card m-3" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">ICU, HDU, CCU, NICU/PICU</h5>
                            <div className="d-flex text">
                                <p className="card-text" >60 fully equipped state of art intensive care beds with wall panels.</p>
                            </div>
                        </div>
                    </div>

                    <div className="card m-3" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Non Invasive + Invasive Cardiology</h5>
                            <div className="d-flex text">
                                <ul className='card-text px-3'>
                                    <li>ECG Echocardiograms</li>
                                    <li>
                                        ECHO Echocardiography
                                    </li>
                                    <li>
                                        Stress ECHO DSE/TMT based
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="card m-3" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Physiotherapy</h5>
                            <div className="d-flex text">
                                <ul className='card-text px-3'>
                                    <li>
                                        Neurological Diagnostic Services
                                    </li>
                                    <li>
                                        Spine physiotherapy and rehabilitation
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className="container-fluid registration-card p-4">
                <div className="row my-5">
                    <div className="register col-md-6" id='register'>
                        <form>
                            <h2 className='mb-5 text-center'>Buy a token</h2>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="form-outline">
                                        <label className={`form-label ${userDataError.firstName && 'text-danger'}`} htmlFor="form3Example1">First name {userDataError.firstName && '* plece enter first name'}</label>
                                        <input type="text" id="form3Example1" name='firstName' onChange={onHandleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-outline">
                                        <label className={`form-label ${userDataError.lastName && 'text-danger'}`} htmlFor="form3Example2">Last name {userDataError.lastName && '* plece enter last name'}</label>
                                        <input type="text" id="form3Example2" name='lastName' onChange={onHandleChange} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-outline mb-4">
                                <label className={`form-label ${userDataError.email && 'text-danger'}`} htmlFor="form3Example2">Email {userDataError.email && '* plece enter email'}</label>
                                <input type="email" id="form3Example3" name='email' onChange={onHandleChange} className="form-control" />
                            </div>
                            <button type="button" onClick={submitHandler} className="btn btn-primary btn-block mb-4">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-6 my-4 RC-card" id='show-RC'>
                        <h2 className='mb-5'><strong>Your token:</strong></h2>
                        <div className="card" id='RC-coupon'>
                            <div className="coupon">
                                <h3>
                                    no: {token.tokenNumber ? token.tokenNumber : 'N/A'}
                                    <span className='mx-1'>exp: {token.exp ? token.exp : 'N/A'}</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
