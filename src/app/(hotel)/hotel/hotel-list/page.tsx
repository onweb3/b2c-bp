import React from 'react'
import HotelListPage from './HotelListPage'
import SectionHeroArchivePage from '@/app/(server-components)/SectionHeroArchivePage'

export default function HotelList():React.ReactElement {
  return (
    <>
    <div className="">
      <SectionHeroArchivePage
        currentPage="Hotel"
        currentTab="Hotel"
        className="hidden lg:block pt-10 lg:pt-16 lg:pb-16 bg-primary-6000"
      />
    </div>

    <HotelListPage/>
  </>
    
  )
}
