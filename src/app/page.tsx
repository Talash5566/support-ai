import React from 'react'
import HomeClient from './Components/HomeClient'
import { getSession } from './lib/getSession'
async function page() {
 const session =  await getSession()
  return (
    <div className='bg-white'>
     <HomeClient email={session?.user?.email!}/>
    </div>
  )
}

export default page
