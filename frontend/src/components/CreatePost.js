import React, {useState, useRef, useCallback, useEffect} from 'react'
import { createPost } from '../action/userAction'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

export const CreatePost = ({openModal, setOpenModal}) => {

    const [ content, setContent ]  = useState({
        'content': ''
      })
    
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const modalRef = useRef()


      const animation = useSpring({
        config: {
          duration: 350,
        },
        opacity: openModal ? 1 : 0,
        transform: openModal ? `translateY(0%)`: `translateY(-100%)`
      })
    
    
      const closeCreateModal = (e) => {
        
        if(modalRef.current === e.target){
          setOpenModal(false)
        }
      }
      const handelsubmit = (e) => {
        e.preventDefault()
        dispatch(createPost(content, navigate))
        setOpenModal(false)
      }

      const keyPress = useCallback(e => {
        if(e.key === 'Escape' && openModal){
          setOpenModal(false)
        }
      },[setOpenModal, openModal])

      useEffect(() => {
        document.addEventListener('keydown', keyPress)
        return () =>  document.removeEventListener('keydown', keyPress)
      },[keyPress])

  return (
    <>
    {openModal? (
        <>
          <div className='justify-center items-center flex overflow-hidden inset-0 z-1 fixed bg-black bg-opacity-50' ref={modalRef} onClick={closeCreateModal}>
            <animated.div style={animation}>
            <div className='bg-white w-[500px]  relative rounded-lg'> 
              <div className='flex items-center justify-between'>
                <h1 className='p-4 text-3xl font-bold'>Create post</h1>
                <IoCloseSharp className='mr-5 text-3xl cursor-pointer' onClick={() => setOpenModal(false)}/>
              </div>
              <hr/>
              <textarea className='w-full focus:outline-none px-2 text-3xl overflow-scroll-none'
               placeholder='Write something to post..' 
               onChange={(e) => {setContent({...content, content: e.target.value})}}
               rows={6}
               />
              <button className='bg-blue-300 py-3 px-5 absolute bottom-2 right-5 rounded-md' onClick={handelsubmit}>Post</button>
            </div>
            </animated.div>
        </div>
        </>
      ):null}
    </>
  )
}
