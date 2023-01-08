import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, db } from './firebase';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

    const handleSignUp = async () =>  {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password).then(console.log("Register Success"));
			const user = result.user;
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				name: username,
				email: email
			});
			navigate("/sign-in");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
    return (
    <div>
        <Navbar islogin={false} />
        <div style={{width: 350}}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>User name</label>
          <input
            type="text"
            className="form-control"
            placeholder="User name"
            value={username}
            onInput={e => setUsername(e.target.value)}
          />
        </div>

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
          <button className="btn btn-primary" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
        </div>
      </div>
  )
}
