import { IoChatbox,   } from 'react-icons/io5'
import {IoMdThumbsUp } from 'react-icons/io'
import moment from 'moment'

import { PostOpton } from './PostOpton'
import { useDispatch } from 'react-redux'
import { like_unlike_post } from '../action/userAction'


export const Feed = ({feed ,authUser, children}) => {
  
  const liked = feed.up_like.find((like) => like.id == authUser.id )
  const dispatch = useDispatch()

  const handleLike = (e) => {
    e.preventDefault()
    dispatch(like_unlike_post({
      post_id: `${feed.id}`,
      value: `${liked ? 'unlike': 'like'}`,
    }))
  }

  return (
   <div className='w-[500px]  bg-white p-4 shadow-xl m-4 rounded-lg relative overflow-hidden' >
     <div className='flex  justify-between' >
       <div className='flex space-x-2'>
        <span className='flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full'></span>
          <div className='flex flex-col'>
            <span className='font-bold text-sm'>{feed.user.username}</span>
            <span className='text-[12px]'>{moment(feed.created).fromNow()}</span>
          </div>
        </div>
          <div className='cursor-pointer'>
            <PostOpton feed={feed} />
          </div>  
     </div>
    <div className='ml-2 mt-2 mb-5 flex items-center'>{children}{feed.content}</div>
    {feed.up_like.length ? (
      <span className='text-[12px] ml-2 flex items-center' ><IoMdThumbsUp className='text-sm text-blue-400 mr-1'/>{feed.up_like.length}</span>
    ) : (null)} 
    <hr/>
    <div className='flex ml-2 justify-between mt-2 h-6'>
     {liked ? (
        <button className='w-full hover:bg-gray-300 h-8 duration-350 flex items-center justify-center  text-sm text-blue-500' onClick={handleLike}><IoMdThumbsUp className='text-xl mr-1 text-blue-500'/> Like</button>
     ): (
      <button className='w-full hover:bg-gray-300 h-8 duration-350 flex items-center justify-center  text-sm'  onClick={handleLike}><IoMdThumbsUp className='text-xl mr-1 text-gray-500'/> Like</button>
     )}
      <button className='w-full hover:bg-gray-300 h-8 duration-350 flex items-center justify-center  text-sm'><IoChatbox className='text-xl  mr-1 text-gray-500'/> comment</button>
    </div>
      
   </div>
  )
}
