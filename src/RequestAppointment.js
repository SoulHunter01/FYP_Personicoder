import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { FaUser,FaEnvelope,FaPhoneSquareAlt,FaCalendar,FaBirthdayCake} from "react-icons/fa";
import { auth, db } from './firebase';
import Navbar from './Navbar';

export default function RequestAppointment() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [psychologist, setPsychologist] = useState("");
	const [date, setDate] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [number, setNumber] = useState("");
  
	const updateUserData = () => {
		const userRef = collection(db, 'users');

        setDoc(doc(userRef, auth.currentUser.uid), {
            email: email,
            name: username,
            psychologist: psychologist,
			date: date,
			birthDate: birthDate,
			number: number
        });
	}
  
  return (
    <div>
      <Navbar islogin={true} />
    <h3>RequestAppointment</h3>

    <div className="mb-3">
      <FaUser/>
      <label>Name</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter Name"
		value={username}
		onChange={(e) => setUsername(e.target.value)}
      />
    </div>

    <div className="mb-3">
    <FaEnvelope/>
      <label>Email address</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
		value={email}
		onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="mb-3">
    <FaUser/>
      <label>Psychologist Name</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter Name"
		value={psychologist}
		onChange={(e) => setPsychologist(e.target.value)}
      />
    </div>

    <div className="mb-3">
    <FaCalendar/>
      <label>Test Date</label>
      <input
        type="date"
        className="form-control"
        placeholder="Enter Date"
		value={date}
		onChange={(e) => setDate(e.target.value)}
      />
    </div>

    <div className="mb-3">
    <FaBirthdayCake/>
      <label>Birthday</label>
      <input
        type="date"
        className="form-control"
        placeholder="Enter Date"
		value={birthDate}
		onChange={(e) => setBirthDate(e.target.value)}
      />
    </div>


    <div className="mb-3">
    <FaPhoneSquareAlt/>
      <label>Number</label>
      <input
        type="number"
        className="form-control"
        placeholder="Enter Number"
		value={number}
		onChange={(e) => setNumber(e.target.value)}
      />
    </div>

    <div className="d-grid">
      <button className="btn btn-primary" onClick={updateUserData}>
        Submit
      </button>
    </div>
  </div>
  )
}
