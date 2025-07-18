import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/use-fetch';
import { getLongUrl } from '../db/apiUrls';
import { BarLoader } from 'react-spinners';
import { storeClicks } from '../db/apiClicks';

const RedirectLink = () => {

  const {id}=useParams();
  const {loading,  data, fn}= useFetch(getLongUrl, id)

  const {loading: loadingStats, fn:fnStats}= useFetch(storeClicks,{
    id:data?.id,
    originalUrl:data?.original_url,
  });

  useEffect(()=>{
    fn() // ✅ call only if ID exists
  }, [])

  
  useEffect(()=>{
    if(!loading && data){
      fnStats();
    }
  },[loading])

  if(loading || loadingStats){
    return(
      <>
      <BarLoader width={"100%"} color='#D73636FF' /> <br/>
      Redirecting......
      </>
    )
  }

  return null
  
}

export default RedirectLink
