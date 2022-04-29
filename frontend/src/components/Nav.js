import React from 'react'

export const Nav = () => {
  return (
    <div className='py-2  flex justify-center space-x-24 border-b items-center bg-white fixed top-0 inset-x-0 z-10 '>
      <div>
        <a>SOCIAL</a>
      </div>
        <div>
          <input className='focus:outline-none border-2 px-2 py-1' placeholder='search for something...' />
        </div>
        <div className='flex space-x-5'>
            <a className='p-1 cursor-pointer font-bold'>Home</a>
            <a className='p-1 cursor-pointer font-bold'>Message</a>
            <a className='p-1 cursor-pointer font-bold'>Notifications</a>
        </div>
    </div>
  )
}
