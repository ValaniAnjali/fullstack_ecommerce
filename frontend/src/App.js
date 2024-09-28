import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect, useState } from 'react';
import SummartApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const[cartProductCount,setProductCount]=useState(0)

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummartApi.current_user.url, {
      method: SummartApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }

    // console.log("data-user", dataResponse)
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummartApi.addToCartProductCount.url, {
      method: SummartApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    console.log("dataapi", dataApi)
    setProductCount(dataApi?.data?.count)
  };

  useEffect(() => {
    /* user details */
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider value={{ 
        fetchUserDetails, //current user
        cartProductCount ,//current user add tocart product component
        fetchUserAddToCart
        }}>
        <ToastContainer 
          position='top-center'
        />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
