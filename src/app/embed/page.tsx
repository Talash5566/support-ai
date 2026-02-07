import React from 'react'
import DashboardClient from '../Components/DashboardClient'
import EmbedChatbot from '../Components/EmbedChatbot'
import { getSession } from '../lib/getSession'
async function page() {
    const session = await getSession()
  return (
    <div>
      <DashboardClient/>
      <EmbedChatbot ownerId={session?.user?.id!}/>
    </div>
  )
}

export default page
