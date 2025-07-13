import React from 'react'

const LinkCard = ({url, fetchUrls}) => {
  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-white rounded-lg' >
      <img src={url?.qr} alt='qr code' />
      
    </div>
  )
}

export default LinkCard
