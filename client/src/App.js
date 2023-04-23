import { useContext } from 'react';
import Login from './components/Login';
import MainPage from './components/MainPage';
import { LotteryContext } from './context/LotteryContext';

function App() {
  const { currentAccount } = useContext(LotteryContext);
  return <div className='App'>{currentAccount ? <MainPage /> : <Login />}</div>;
}

export default App;
