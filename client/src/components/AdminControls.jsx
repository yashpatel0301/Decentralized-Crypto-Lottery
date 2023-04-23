import React, { useContext } from 'react';
import { LotteryContext } from '../context/LotteryContext';
import {
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from '@heroicons/react/24/solid';

function AdminControls() {
  const {
    operatorCommission,
    drawWinner,
    withdrawCommission,
    restartDraw,
    refundAll,
  } = useContext(LotteryContext);
  return (
    <div className='text-white text-center px-5 py-3 rounded-md border-gray-400 border-2'>
      <h2 className='font-bold'>Admin Controls</h2>
      <p className='mb-5'>
        Total Commission to be withdrawn: {operatorCommission} ETH
      </p>
      <div className='flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0'>
        <button onClick={() => drawWinner()} className='admin-button'>
          <StarIcon className='h-6 mx-auto mb-2' />
          Draw Winner
        </button>
        <button onClick={() => withdrawCommission()} className='admin-button'>
          <CurrencyDollarIcon className='h-6 mx-auto mb-2' />
          Withdraw Commision
        </button>
        <button onClick={() => restartDraw()} className='admin-button'>
          <ArrowPathIcon className='h-6 mx-auto mb-2' />
          Restart Draw
        </button>
        <button onClick={() => refundAll()} className='admin-button'>
          <ArrowUturnDownIcon className='h-6 mx-auto mb-2' />
          Refund All
        </button>
      </div>
    </div>
  );
}

export default AdminControls;
