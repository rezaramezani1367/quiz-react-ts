import React ,{FC} from 'react'
interface Errorprops{
    errorApi:string
}
const ErrorAPI: FC<Errorprops> = ({errorApi}) => {
  return (
    <div className='h-96 flex justify-center items-center'>
    <div className='flex items-center gap-2 font-bold'>
    
    <span className='animate-bounce text-3xl text-red-700'>{errorApi}</span>
    </div>
</div>
  )
}

export default ErrorAPI