import React from 'react'
import { UpperNav } from '../utils/UpperNav'
import { Sidebar } from '../utils/Sidebar'
import { useGlobalContext } from '../context/context'

export const ShowsPage = () => {
  const { list } = useGlobalContext();
  return (
    <>
    <div className="hidden md:flex">
        <div className="flex-[65%]  bg-navbar h-screen text-PrimaryTextClr">
          <UpperNav />
        </div>
        <div className="flex-[35%] bg-primary h-screen md:max-w-xs">
          <Sidebar />
        </div>
      </div>
  </>
  )
}
