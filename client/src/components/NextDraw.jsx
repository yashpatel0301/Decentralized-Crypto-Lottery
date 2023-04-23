import React, { useContext, useState } from 'react';
import { LotteryContext } from '../context/LotteryContext';
import CountdownTimer from './CountdownTimer';
import AdminControls from './AdminControls.jsx';
import Marquee from 'react-fast-marquee';

function NextDraw() {
  const [quantity, setQuantity] = useState(1);
  const {
    remainingTickets,
    currentWinning,
    ticketCommision,
    currentTicketPrice,
    expiration,
    buyTickets,
    userTickets,
    userWinnings,
    withdrawWinnings,
    lastWinner,
    lastWinnerAmount,
    lotteryOperator,
    currentAccount,
  } = useContext(LotteryContext);
  return (
    <>
      {/* LAST WINNING */}
      <Marquee className='bg-black p-5 mb-5' gradient={false} speed={100}>
        <div className='text-white flex space-x-2 mx-10 font-bold'>
          <h1>Last Winner : {lastWinner}</h1>
          <h1>Last Winner : {lastWinnerAmount} ETH</h1>
        </div>
      </Marquee>

      {/* ADMIN CONTROLS */}
      <AdminControls />
    
      {lotteryOperator == currentAccount? (
        <div className='flex justify-center'>
        </div>
      ) : (
        ''
      )}
      {/* WIN BUTTON */}
      {userWinnings > 0 && (
        <div className='mx-20 mt-5 justify-center'>
          <button
            onClick={() => withdrawWinnings()}
            className='p-5 bg-[#D9103B] text-white animate-pulse text-center rounded-xl w-full'
          >
            <p className='font-bold'>Congratulations</p>
            <p>Total Winnings : {userWinnings} ETH</p>
            <br />
            <p className='font-semibold'>Click Here to Withdraw</p>
          </button>
        </div>
      )}

      <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
        <div className='bg-[#1D283A] rounded border-2 border-white '>
          <div className='bg-[#283346] rounded-tl rounded-tr px-10 py-4'>
            <h1 className='text-5xl text-white font-semibold text-center'>
              Next Draw
            </h1>
          </div>
          <div className='flex justify-between p-2 space-x-2 '>
            <div className='bg-[#283346] text-white p-4 flex-1 rounded-md  border-2 border-gray-400'>
              <h2 className='text-sm '>Total Pool</h2>
              <p className='text-xl'>{currentWinning} ETH</p>
            </div>
            <div className='bg-[#283346] text-white p-4 flex-1 rounded-md  border-2 border-gray-400'>
              <h2 className='text-sm '>Tickets Remaining</h2>
              <p className='text-xl'>{remainingTickets}</p>
            </div>
          </div>
          {/* COUNTDOWN TIMER */}
          <div className='mt-5 mb-3'>
            <CountdownTimer />
          </div>
        </div>

        <div className='bg-[#1D283A] rounded border-2 border-white p-5 space-y-2 '>
          <div className='bg-[#1D283A] rounded border-2 border-gray-400 p-5'>
            <div className='flex justify-between items-center text-white pb-2'>
              <h1>Price Per Ticket</h1>
              <p>{currentTicketPrice} ETH</p>
            </div>
            <div className='flex text-white items-center  justify-between p-4 bg-[#283346] rounded-lg border-2 border-gray-600'>
              <p>TICKETS</p>
              <input
                type='number'
                className='flex w-full m-2 bg-transparent text-right outline-none'
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
            </div>
            <div className='mt-4 space-y-1'>
              <div className='flex items-center justify-between text-gray-100 text-xs italic font-bold'>
                <p>Total cost of Tickets</p>
                <p>{currentTicketPrice * quantity}</p>
              </div>
              <div className='flex items-center justify-between text-gray-100 text-xs italic'>
                <p>Service Fees</p>
                <p>{ticketCommision} ETH</p>
              </div>
              <div className='flex items-center justify-between text-gray-100 text-xs italic'>
                <p>+ Network Fees</p>
                <p>TBC</p>
              </div>
            </div>

            <button
              onClick={() => buyTickets(quantity)}
              disabled={
                expiration.toString() < Date.now().toString() ||
                remainingTickets === 0
              }
              className='mt-5 w-full py-4 px-10 rounded-md bg-[#D9103B] text-white shadow-xl disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500'
            >
              Buy {quantity} tickets for {currentTicketPrice * quantity} ETH
            </button>
          </div>
          {userTickets > 0 && (
            <div className='bg-[#283346] text-white p-4 flex-1 rounded-md  border-2 border-gray-400'>
              <p className='text-lg mb-2'>
                You have {userTickets} tickets in this draw
              </p>
              <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2'>
                {Array(userTickets)
                  .fill('')
                  .map((_, index) => (
                    <p
                      className='flex flex-shrink-0 items-center justify-center text-white rounded h-20 w-12 bg-[#D9103B] text-xs italic'
                      key={index}
                    >
                      {index + 1}
                    </p>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NextDraw;
