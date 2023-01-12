import React from 'react'
import spinner from "../assests/spinner.svg"

function Spinner() {
  return (
   <div clsssName="bg-black bg-opacity-50 flex items-center justify-center">
    <div className='flex  justify-center items-center min-h-[100vh]'>
        <img className='h-24 bg-transparent' src={spinner} alt="" />

    </div>
   </div>
  )
}

export default Spinner