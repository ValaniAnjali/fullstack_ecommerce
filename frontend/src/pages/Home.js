import React from 'react'
import CatagoryList from '../components/CatagoryList'
import BanerProduct from '../components/BanerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CatagoryList/>
      <BanerProduct/>

      <HorizontalCardProduct catagory={"airpodes"} heading={"Top's Airpods"}/>
      <HorizontalCardProduct catagory={"earphones"} heading={"Popular EarPhones"}/>

      <VerticalCardProduct catagory={"mobiles"} heading={"Popular Mobile"}/>
      <VerticalCardProduct catagory={"mouse"} heading={"Popular Mouse"}/>
      <VerticalCardProduct catagory={"televisions"} heading={"Television"}/>
      <VerticalCardProduct catagory={"camera"} heading={"Camera and photography"}/>
      <VerticalCardProduct catagory={"speakers"} heading={"Bluetooth speaker"}/>
      <VerticalCardProduct catagory={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct catagory={"trimmers"} heading={"Trimmers"}/>
      

    </div>
  )
}

export default Home