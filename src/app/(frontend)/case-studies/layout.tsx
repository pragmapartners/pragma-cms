import React from 'react'

export default function CaseStudiesLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}
      {/* <div className="overlay top">inset start 50%</div>
      <div className="overlay bottom">inset end 10%</div> */}
    </>
  )
}