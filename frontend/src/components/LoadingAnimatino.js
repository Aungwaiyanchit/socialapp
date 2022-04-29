import React from 'react'

export const LoadingAnimation = () => {
  const cards = [1, 2, 3]
  return (
    <>
      {cards.map((card) => (
        <div className='w-[500px] bg-white p-4 m-4 shadow-xl rounded-lg animate-pulse' key={card}>
            <div className='flex justify-between '>
                <div className='flex space-x-2'>
                    <span className='flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full'></span>
                    <div className='flex flex-col justify-evenly'>
                      <span className='flex-shrink-0 w-32 bg-gray-100 h-2 rounded'></span>
                      <span className='flex-shrink-0 w-15 bg-gray-100 h-2 rounded'></span>
                    </div>
                </div>
            </div>
            <p className='flex flex-shrink-0 bg-gray-100 w-full h-60 mt-3 rounded'></p>
        </div>
      ))}
    </>
  )
}
