import React from 'react'
import Navbar from './Navbar'
import './Page.css'

function Page() {
    return (
        <div>
            <Navbar islogin={true} />
            <div className='page'>
                <h2 className='txt'>“It’s so incredible to finally be understood.”</h2>
                <h3>“Only 10 minutes to get a “freakishly accurate” description of who you are and why you do things the way you do.”</h3>
                <button>Take the Test</button>
            </div>
        </div>
    )
}

export default Page