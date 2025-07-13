import React from 'react'

const LinkCard = ({url, fetchUrls}) => {
  return (
    <div className='flex ' >
      <img src={url?.qr} alt='qr code' />
      
    </div>
  )
}

export default LinkCard
