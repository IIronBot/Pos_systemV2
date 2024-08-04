import React from 'react';
import { Link } from 'react-router-dom'
import { BackArrow } from '../components/BackArrow.jsx'
import './Cashier.css'
import { orderContext } from '../context/exportContext.jsx'
import { useContext, useEffect } from 'react'
import OrdersBlock from '../components/OrdersBlock.jsx'
import Loading from '../components/Loading.jsx'
export const Cashier = () => {
  const {orders, fetchOrders} = useContext(orderContext)
  
  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='cashier' >
      <BackArrow data ={''} />
        <h1>Cashier</h1>
        <Link to = '/order'><button className='orderButton'>Create Order</button></Link>
        <div className='currentOrders'>
          {orders ? <OrdersBlock /> : <Loading />}
        </div>
    </div>
  )
}
