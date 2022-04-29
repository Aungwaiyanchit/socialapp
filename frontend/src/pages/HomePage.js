import React, {  useState } from 'react'
import { Feeds } from '../components/Feeds'
import { Sidebar } from '../components/Sidebar'
import { Nav } from '../components/Nav'
// import { fetchPost, restPost } from '../action/userAction'
// import { useDispatch, useSelector } from 'react-redux'
import { IoImages, IoSadOutline, IoVideocam } from 'react-icons/io5'

import { useNavigate } from 'react-router-dom'
import { CreatePost } from '../components/CreatePost'



export const HomePage = () => {


  const [ openModal, setOpenModal ] = useState(false)
  const navigate = useNavigate()
  

  const openCreateModal = (e) => {
    e.preventDefault()
    setOpenModal(true)
  }
 
  
  // const loadPost = async () => {
  //    dispatch(fetchPost());
  // }
 


  const Sidebarf = () => {
    return(
      <div className='fixed right-0'>Sidebar</div>
    )
  }
  return (
   <>
      <Nav/>
      <div className='mt-12 flex justify-center space-x-10'>
        <Sidebar/>
        {/* cratePost */}
        <div>
              <div className='w-[500px] bg-white m-4  p-4 rounded-lg shadow-lg'>
                <div className='flex space-x-3'>
                  <div className='flex-shrink-0 bg-gray-600 rounded-full w-10 h-10'></div>
                  <div className='h-10 flex items-center px-2 rounded-3xl cursor-pointer bg-gray-200 hover:bg-gray-300 w-full ' onClick={openCreateModal}>Write something to post.....</div>
                </div>
                <hr className='mt-4 border-t'/>
                <div className='flex justify-evenly items-center mt-4'>
                  <div className='flex items-center space-x-2 hover:bg-gray-100 w-full p-2 cursor-pointer rounded'>
                    <IoVideocam className='text-2xl text-red-600'/>
                    <span className='font-medium text-[16px]'>Live video</span>
                  </div>
                  <div className='flex items-center space-x-2 hover:bg-gray-100 w-full p-2 cursor-pointer rounded'>
                    <IoImages className='text-2xl text-green-600'/>
                    <span  className='font-medium text-[16px]'>Photo/video</span>
                  </div>
                  <div className='flex items-center space-x-2 hover:bg-gray-100 w-full p-2 cursor-pointer rounded'>
                    <IoSadOutline className='text-2xl text-yellow-600'/>
                    <span  className='font-medium text-[16px]'>Felling/activities</span>
                  </div>
               </div>
         </div>
          <Feeds />
        </div>
        <Sidebarf />
      </div>
      <CreatePost openModal={openModal} setOpenModal={setOpenModal}/>
   </>
   )
  
}
