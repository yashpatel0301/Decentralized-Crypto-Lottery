import React, { useContext } from 'react';
import { LotteryContext } from '../context/LotteryContext';
import Countdown from 'react-countdown';

function CountdownTimer() {
  const { expiration } = useContext(LotteryContext);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className='m-8'>
          <h3 className='text-white text-center text-xl mb-2 font-bold animate-pulse'>
            Ticket Sales is now CLOSED !!
          </h3>
          <div className='flex space-x-6'>
            <div className='flex-1'>
              <div className='animate-pulse countdown'>{hours}</div>
              <div className='animate-pulse countdown-label'>hours</div>
            </div>
            <div className='flex-1'>
              <div className='animate-pulse countdown'>{minutes}</div>
              <div className='animate-pulse countdown-label'>minutes</div>
            </div>
            <div className='flex-1'>
              <div className='animate-pulse countdown'>{seconds}</div>
              <div className='animate-pulse countdown-label'>seconds</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='m-8'>
          <h3 className='text-white text-sm mb-2 italic'>Time Remaining</h3>
          <div className='flex space-x-6'>
            <div className='flex-1'>
              <div className='countdown'>{hours}</div>
              <div className='countdown-label'>hours</div>
            </div>
            <div className='flex-1'>
              <div className='countdown'>{minutes}</div>
              <div className='countdown-label'>minutes</div>
            </div>
            <div className='flex-1'>
              <div className='countdown'>{seconds}</div>
              <div className='countdown-label'>seconds</div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <Countdown date={new Date(expiration * 1000)} renderer={renderer} />
    </div>
  );
}

export default CountdownTimer;
