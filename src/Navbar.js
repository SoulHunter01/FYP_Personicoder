import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from "react-router-dom";

export default function Navbar({ islogin }) {
    const navigate = useNavigate();

    const logOut = async () => {
        await signOut(auth);
        navigate("/sign-in");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/page'}>
              personiCoder
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {!islogin && <li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                        Login
                    </Link>
                </li>}
                {!islogin && <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                        Sign up
                    </Link>
                </li>}
                {islogin && <li className="nav-item">
                    <Link className="nav-link" to={'/appointment'} >
                        Appointment
                    </Link>
                </li>}
                {islogin && <li className="nav-item">
                    <Link className="nav-link" to={'/chat'}>
                        Chat
                    </Link>
                </li>}
                {islogin && <li className="nav-item">
                    <Link className="nav-link" onClick={logOut} >
                        Log out
                    </Link>
                </li>}
              </ul>
            </div>
          </div>
        </nav>
    )
}
