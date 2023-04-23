import React, { useContext } from 'react';
import NavButton from './NavButton';
import { LotteryContext } from '../context/LotteryContext';
import logo from '../assets/raffle.png';

function Header() {
  const { currentAccount, connectWallet, disconnectWallet } =
    useContext(LotteryContext);
  return (
    <header className='grid grid-cols-2 justify-between items-center p-5'>
      <div className='flex items-center space-x-2'>
        <img src={logo} alt='' className='h-20 w-20' />
        <div>
          <h1 className='text-lg text-white font-bold'>Crypto Lottery</h1>
          <h1 className='text-xs text-gray-300 truncate'>
            User:- {currentAccount.substring(0, 5)}...
            {currentAccount.substring(currentAccount.length - 4)}
          </h1>
        </div>
      </div>

      <div className='flex items-center rounded-md ml-1'>
        <div className='flex flex-col md:flex-row p-4 space-x-2 justify-center ml-auto'>
          <NavButton onClick={disconnectWallet} isActive title='Logout' />
        </div>
      </div>
    </header>
  );
}

export default Header;
