import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from './firebase';
import './Login.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';


export default function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) navigate("/page");
    }, [user, loading, navigate]);
    

    const handleLogIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                console.log("Login Success");
                // navigate('/page')
            })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    return (
        
        <div>
        <Navbar islogin={false} />
        <div style={{width: 350}} >
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onInput={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onInput={e => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-primary" onClick={handleLogIn}>
            Submit
          </button>
        </div>
        </div>
      </div>
    )
}
