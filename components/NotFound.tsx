import Image from 'next/image'
import React from 'react'
import notFound from "@/public/notFound.png"

function NotFound({text}:{text:string}) {
  return (
    <div className='flex justify-center items-center flex-col my-[14%]'>
        <div className='relative w-20 h-20  flex justify-center items-center border-red-600 border-1 rounded-full'>
        <Image className='' fill src={notFound} alt='Not Found'/>
        </div>
        <p className='text-white mt-2'>{text}</p>
    </div>
  )
}

export default NotFound