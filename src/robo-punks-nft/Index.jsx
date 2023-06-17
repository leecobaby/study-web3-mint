import { useState } from 'react'
import { MainMint } from './MainMint'
import { NavBar } from './NavBar'
import './index.css'

export function RoboPunksNFT() {
  const [accounts, setAccounts] = useState([])
  document.body.classList.add('no-scroll');
  return (
    <div className="overlay">
      <div className="robo-app">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>
  )
}
