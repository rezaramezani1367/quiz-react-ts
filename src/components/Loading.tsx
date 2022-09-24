import React from 'react'
import { ImSpinner } from "react-icons/im";

const Loading = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
        <div className='flex items-center gap-2 font-bold'>
        <ImSpinner className='text-slate-600 text-3xl animate-spin' />
        {/* <span className='animate-pulse'>Loading ...</span> */}
        </div>
    </div>
  )
}

export default Loading