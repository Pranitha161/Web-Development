import React from 'react'
import { useRouteError } from 'react-router-dom'

 function Errorpage () {
    let routingError=useRouteError()
   
  return (
    <div className='text-center'>
        <h1>{routingError.status}-{routingError.data}</h1>
    </div>
  )
}



export default Errorpage