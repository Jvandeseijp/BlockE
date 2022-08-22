import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './WalletCard.css'
import Home from "./Home";
import { Link } from 'react-router-dom';
import BookStore from "../images/logo1.png";
import { useMoralis } from 'react-moralis';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contractConfig';

const Main = () => {

  const [errorMessage, setErrorMessage] = useState(null);

  const [userBalance, setUserBalance] = useState(null);

  const [tokenBalance, setTokenBalance] = useState(0);

  const {account, authenticate, Moralis} = useMoralis(); 
 

  useEffect(() => {

    async function getTokenBalance(){
      const readOptions = {
        contractAddress: CONTRACT_ADDRESS,
        functionName: "balanceOf",
        abi: CONTRACT_ABI,
        params:{
          account: account
        }
      };
      
      const userTokenBalance = await Moralis.executeFunction(readOptions);
     
      const bal = Moralis.Units.FromWei(userTokenBalance, 9);
    
      setTokenBalance(parseFloat(bal).toFixed(2));
    }

    if (account){
      getTokenBalance();      
    }

  }, [account, tokenBalance]);
  
  const handleAuth = async() => {
    await authenticate({signingMessage:"Connect to BLOCK-E"});
  }

 
  return (
    <div className='walletCard'>
      <div className='logoDiv'>
        <img src={BookStore} className="logo"></img>
      </div>
      <h4 className='headingC'> Connect MetaMask Wallet </h4>

      <div className='mainBox'>
        <div className='walletCards'>
        <button className='connectBtn' onClick={handleAuth}>{account? "It's Connected!" : "Connect Wallet"}</button>

          <div className='accountDisplay'>
            <h3 className='address'>Address: {account? account.slice(0,6)+'...'+account.slice(-4): ''}</h3>
            </div>
          <div className='accountDisplay'>
            {account?
          <h3 className='address'>TokenBalance: {tokenBalance} BLOCK-E</h3>
          :
          ''
          }
          </div>
        </div>

        <div className='mainBtn'>
          {account?
          tokenBalance == 0 ?
            <div className='walletCardss'>
              <span className='purchase'> You need to purchase Block-e to accees the wallet </span>
              <div className='newCard'>
                <div className='walletCardss'>
                  <a href='https://block-e.app/' target="_blank" > <button className='walletBtn'>Home Page</button> </a>
                </div>
                <div className='walletCardss'>
                  <a href='https://app.uniswap.org/#/swap?&chain=mainnet&use=v2&outputCurrency=0xa9f9aCB92E4E2f16410511D56839A5Bd1d630a60' target="_blank" > <button className='walletBtn'>Purchase Block-E</button>
                  </a>
                </div>
              </div>
            </div>
            :
            <div className='walletCardsss'>
          <Link to="/home" className='walletBtn'> Go To The Dapp </Link>
          </div>
          
          :''
          }
          
          
          {/*
           {tokenBalance > 100 ?  <div className='walletCardsss'>
          <Link to="/home" className='walletBtn'> Go To The Dapp </Link>
        </div>
         :
          <div className='walletCardsss'>
        <a
         href="https://block-e.app/"
          className='walletBtn'
          target="_blank"
          rel="norefferer"
          > Back To Home Page </a>
        <a
         href="https://app.uniswap.org/#/swap?&chain=mainnet&use=v2&outputCurrency=0xa9f9aCB92E4E2f16410511D56839A5Bd1d630a60"
          className='walletBtn'
          target="_blank"
          rel="norefferer"
          > Purchase Block-E </a>
        </div>
        
        }*/}
        </div>
      </div>

      {errorMessage}
    </div>
  );
}

export default Main;