import React from 'react';
import { Link } from 'react-router-dom';

export function JobChoice (){
  const buttonStyle = 'bg-transparent rounded-sm border-white border-2 h-20 w-52 cursor-pointer mx-10 hover:bg-[color:var(--secondary-color)] hover:text-black transition-all ease-in'
  return (
    <div className='flex justify-center items-center w-screen h-screen text-white no-underline '>
      <Link to = '/cashier'><button className={buttonStyle}>Cashier</button></Link>
      <Link to ='/buser'><button className = {buttonStyle}>Buser</button></Link>
      <Link to ='/cook'><button className = {buttonStyle}>Cook</button></Link>
    </div>
  )
}

