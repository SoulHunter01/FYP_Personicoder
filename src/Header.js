import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
    

    return (
        <div className='header'>
            <div className='header__left'>
                <h2>Logo</h2>
            </div>

            <div className='header__center'>
                <span className='center__heading'>Personality Test</span>
                <span className='center__heading'>Request Appointment</span>
                <span className='center__heading'>About Us</span>
            </div>

            <div className='header__right'>
                <button className='login__btn'><Link to="/Login">Login</Link></button>
                <button className='take__test__btn'>Take the Test</button>
            </div>

        </div>
    )
}

export default Header