import React, { useState, useEffect, createContext } from 'react';

import { ethers } from 'ethers';
import toast from 'react-hot-toast';

import { contractAbi, contractAddress } from '../utils/constants';

const { ethereum } = window;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const lotteryContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return lotteryContract;
};

export const LotteryContext = createContext();

export const LotteryProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const lotteryContract = getContract();

  ethereum.on('accountsChanged', async () => {
    const getAccount = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    setCurrentAccount(getAccount[0]);
  });

  //CONTRACT STATES
  const [remainingTickets, setRemainingTickets] = useState(0);
  const [currentWinning, setCurrentWinning] = useState(0);
  const [currentTicketPrice, setCurrentTicketPrice] = useState(0);
  const [ticketCommision, setTicketCommision] = useState(0);
  const [expiration, setExpiration] = useState(0);
  const [reload, setReload] = useState(0);
  const [userTickets, setUserTickets] = useState(0);
  const [userWinnings, setUserWinnings] = useState(0);
  const [lastWinner, setLastWinner] = useState(0);
  const [lastWinnerAmount, setLastWinnerAmount] = useState(0);
  const [lotteryOperator, setLotteryOperator] = useState(0);
  const [operatorCommission, setOperatorCommission] = useState(0);
  //CONTRACT STATES

  //READING CONTRACT FUNCTION
  const getRemainingTickets = async () => {
    const response = await lotteryContract.RemainingTickets();
    const tickets = parseInt(response._hex);
    setRemainingTickets(tickets);
  };

  const getCurrentWinningReward = async () => {
    const response = await lotteryContract.CurrentWinningReward();
    const winning = ethers.utils.formatEther(response.toString());
    setCurrentWinning(winning);
  };

  const getCurrentTicketPrice = async () => {
    const response = await lotteryContract.ticketPrice();
    const price = ethers.utils.formatEther(response.toString());

    setCurrentTicketPrice(price);
  };

  const getTicketCommision = async () => {
    const response = await lotteryContract.ticketCommission();
    const price = ethers.utils.formatEther(response.toString());
    console.log(price);
    setTicketCommision(price);
  };

  const getExpiration = async () => {
    const response = await lotteryContract.expiration();
    const time = response.toString();
    console.log(time);
    setExpiration(time);
  };

  const getUserTickets = async () => {
    const totalTickets = await lotteryContract.getTickets();

    const lower = totalTickets.map((element) => {
      return element.toLowerCase();
    });

    const noOfUserTicket = lower.reduce(
      (total, ticketAddress) =>
        ticketAddress.toLowerCase() === currentAccount.toLowerCase()
          ? total + 1
          : total,
      0
    );

    setUserTickets(noOfUserTicket);
  };

  const getUserWinnings = async () => {
    if (!currentAccount) return;

    const response = await lotteryContract.getWinningsForAddress(
      currentAccount
    );
    const winnings = ethers.utils.formatEther(response.toString());
    setUserWinnings(winnings);
    console.log(winnings);
  };

  const getLastWinnerwithAmount = async () => {
    const lastWin = await lotteryContract.lastWinner();
    const lastWinAddr = lastWin.toString();
    setLastWinner(lastWinAddr);

    const lastWinAmount = await lotteryContract.lastWinnerAmount();
    const lastWinAm = ethers.utils.formatEther(lastWinAmount.toString());
    setLastWinnerAmount(lastWinAm);
  };

  const getLotteryOperator = async () => {
    const response = await lotteryContract.lotteryOperator();
    setLotteryOperator(response.toString());
  };

  const getOperatorCommission = async () => {
    const response = await lotteryContract.operatorTotalCommission();
    const commission = ethers.utils.formatEther(response.toString());
    setOperatorCommission(commission);
  };
  //READING CONTRACT FUNCTION

  //WRITING CONTRACT FUNCTION
  const buyTickets = async (quantity) => {
    if (quantity <= 0) return toast.error('Atleast 1 Ticket needed');
    const notification = toast.loading('Buying your Tickets !!');
    try {
      const response = await lotteryContract.BuyTickets({
        value: ethers.utils.parseEther(
          (
            Number(
              ethers.utils.formatEther(await lotteryContract.ticketPrice())
            ) * quantity
          ).toString()
        ),
      });
      const tx = await response.wait();
      toast.success('Tickets Bought Successfully !!', {
        id: notification,
      });
      console.log('Buying Tickets', tx);
      setReload(1);
    } catch (error) {
      toast.error('Whoops Something went wrong', {
        id: notification,
      });
      console.log(error);
    }
  };

  const withdrawWinnings = async () => {
    const notification = toast.loading('Withdrawing Funds...');
    try {
      const response = await lotteryContract.WithdrawWinnings();
      const tx = await response.wait();
      toast.success('Withdrawal Successfull', {
        id: notification,
      });
      setReload(1);

      console.log('Withdrawal Receipt:- ', tx);
    } catch (error) {
      toast.error('Withdrawal Unsuccessfull', {
        id: notification,
      });
      console.log(error);
    }
  };

  const drawWinner = async () => {
    const notification = toast.loading('Drawing Winner...');
    try {
      const response = await lotteryContract.DrawWinnerTicket();
      const tx = await response.wait();
      toast.success('Winner Declared !!', {
        id: notification,
      });
      setReload(1);
      console.log('Winner TX:- ', tx);
    } catch (error) {
      toast.error('Whoops Something went wrong !!', {
        id: notification,
      });
      console.log(error);
    }
  };

  const withdrawCommission = async () => {
    if (operatorCommission <= 0)
      return toast.error('No Commission Available to Withdraw');
    const notification = toast.loading('Withdrawing Commission...');
    try {
      const response = await lotteryContract.WithdrawCommission();
      const tx = await response.wait();
      toast.success('Wallet Updated !!', {
        id: notification,
      });
      setReload(1);
      console.log('Commission TX:- ', tx);
    } catch (error) {
      toast.error('Whoops Something went wrong !!', {
        id: notification,
      });
      console.log(error);
    }
  };

  const restartDraw = async () => {
    const notification = toast.loading('Restarting Draw');
    try {
      const response = await lotteryContract.restartDraw();
      const tx = await response.wait();
      toast.success('Draw Begins !!', {
        id: notification,
      });
      setReload(1);
      console.log('Restart TX:- ', tx);
    } catch (error) {
      toast.error('Whoops Something went wrong !!', {
        id: notification,
      });
      console.log(error);
    }
  };

  const refundAll = async () => {
    const notification = toast.loading('Refunding in Progress...');
    try {
      const response = await lotteryContract.RefundAll();
      const tx = await response.wait();
      toast.success('Refunds Done !!', {
        id: notification,
      });
      setReload(1);
      console.log('Refund TX:- ', tx);
    } catch (error) {
      toast.error('Whoops Something went wrong !!', {
        id: notification,
      });
      console.log(error);
    }
  };
  //WRITING CONTRACT FUNCTION

  //WALLET FUNCTIONALITY

  const disconnectWallet = async () => {
    const notification = toast.loading('Logging out !!');

    const response = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {} }],
    });
    console.log(response);
    setCurrentAccount('');
    toast.success('Logged Out', {
      id: notification,
    });
  };

  const connectWallet = async () => {
    if (!ethereum) return toast.error('Please Install Metamask');
    const notification = toast.loading('Logging in !!');
    try {
      console.log('Here');
      const getAccount = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(getAccount[0]);
      toast.success('Logged In', {
        id: notification,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        id: notification,
      });
    }
  };

  const checkWalletConnected = async () => {
    if (!ethereum) return alert('Please Install Metamask');

    const account = await ethereum.request({ method: 'eth_accounts' });

    if (account.length) {
      setCurrentAccount(account[0]);
    }
  };

  //WALLET FUNCTIONALITY

  useEffect(() => {
    //checkWalletConnected();
    getLotteryOperator();
    getRemainingTickets();
    getCurrentWinningReward();
    getCurrentTicketPrice();
    getTicketCommision();
    getExpiration();
    getUserTickets();
    getUserWinnings();
    getLastWinnerwithAmount();
    getOperatorCommission();
    setReload(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, currentAccount]);
  return (
    <LotteryContext.Provider
      value={{
        currentAccount,
        checkWalletConnected,
        connectWallet,
        disconnectWallet,
        remainingTickets,
        currentWinning,
        currentTicketPrice,
        ticketCommision,
        expiration,
        userTickets,
        userWinnings,
        lastWinner,
        lastWinnerAmount,
        lotteryOperator,
        operatorCommission,
        buyTickets,
        withdrawWinnings,
        drawWinner,
        withdrawCommission,
        restartDraw,
        refundAll,
      }}
    >
      {children}
    </LotteryContext.Provider>
  );
};
