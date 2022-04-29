import React from 'react'
import { useSelector } from 'react-redux'
import { Feed } from './Feed'
import { LoadingAnimation } from './LoadingAnimatino'
import { Spinner } from './Spinner'



export const Feeds = () => {

     const feeds = useSelector((state) => state.feeds)
     const isLoading = useSelector((state) => state.feeds.loading)
     const  authUser = useSelector((state) => state.auth.user)
     console.log(feeds);
  
  return (
        !feeds.posts.length ? <LoadingAnimation/> : (
          isLoading   ?  <Spinner/> : (
            <>
             <div>
               {
                   feeds.posts.map(feed => (
                         <Feed feed={feed} key={feed.id} authUser={authUser}/>
                 ))
               }
             </div>
             
            </>
        )
  )
  )
}
