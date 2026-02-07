import React from 'react'
import DashboardClient from '../Components/DashboardClient'
import ChatbotSettings from '../Components/ChatbotSettings'
import { getSession } from '../lib/getSession'
async function page() {

  const session = await getSession()
  return (
    
    <>
      <DashboardClient/>
      <ChatbotSettings ownerId={session?.user?.id!} />
    </>
  )
}

export default page
