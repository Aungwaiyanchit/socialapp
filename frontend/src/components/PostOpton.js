import React, { useRef, useEffect, useState } from 'react'
import { IoPencilSharp, IoTrash, IoChevronDownOutline } from 'react-icons/io5'
import { deltePost } from '../action/userAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSpring, animated } from 'react-spring'


export const PostOpton = ({feed}) => {

    const [ open, setOpen ] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const optionRef = useRef() 


    const animation = useSpring({
      config: {
        duration: 50,
      },
      opacity: open ? 1 : 0,
      transform: open ? `translateY(0%)`: `translateY(-10%)`
    })

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deltePost(feed.id))
        setOpen(false)
        navigate('/', {replace: true})
    } 
    useEffect(() => {
      const closeOption = e => {
        if(optionRef.current !== null && !optionRef.current.contains(e.target)){
          setOpen(false)
        }
      }
      if(open){
        document.addEventListener("click", closeOption);
        document.addEventListener('keydown', closeOption)
      }
      return () => {
        document.removeEventListener("click", closeOption);
        document.removeEventListener('keydown', closeOption)
      }
    },[open])
    
    
  return (
    <>
     <button className='w-7 h-7 rounded-full  flex items-center justify-center' onClick={() => setOpen(!open)}> <IoChevronDownOutline /> </button>
         {
        open? (

                <animated.div className='bg-white rounded text-[12px]  absolute right-3  top-12 shadow-3xl duration-150' ref={optionRef} style={animation}>
                    <a className='  hover:bg-slate-100 cursor-pointer px-5 py-3 m-2 flex items-center'><IoPencilSharp className='text-[12px] mr-2'/>Edit</a>
                    <a className=' hover:bg-slate-100 cursor-pointer px-5 py-3 m-2 flex items-center ' onClick={handleDelete}><IoTrash className='text-[12px] mr-2'/>Delete</a>
                </animated.div>

        ): null
      } 
    </>
  )
}
