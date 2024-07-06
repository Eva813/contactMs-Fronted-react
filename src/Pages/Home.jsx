import React from 'react'
import Navbar from '../Components/Navbar'
import '../assets/css/home.css'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home flex flex-col justify-center items-center text-white h-[92vh] px-8">
        <h1 className='home-title text-2xl mb-2 tracking-wider'>
          contact management system
        </h1>
        <p className='text-xl mb-5'>
            Start Collecting your contacts in a very smarter way.
            We provide very efficient and smarter way to handle contacts.
        </p>
      </div>
    </>
  )
}
