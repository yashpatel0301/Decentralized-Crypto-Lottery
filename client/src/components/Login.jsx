import React from 'react';
import { useContext } from 'react';
import { LotteryContext } from '../context/LotteryContext';
import logo from '../assets/raffle.png';

function Login() {
  const { connectWallet } = useContext(LotteryContext);
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center mb-10'>
        <img className='rounded h-56 w-56 mb-10' src={logo} alt='logo' />
        <h1 className='text-6xl text-black font-bold'>CRYPTO LOTTERY !!</h1>
        <button
          onClick={connectWallet}
          className='text-white bg-black py-5 px-8 rounded my-10 text-2xl shadow-lg hover:bg-gray-700 hover:text-white'
        >
          Login with Metamask
        </button>
      </div>
    </div>
  );
}

export default Login;
