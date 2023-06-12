import React from 'react'

export function NavBar({ accounts, setAccounts }) {
  const isConnected = Boolean(accounts[0])

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccounts(accounts)
    }
  }
  return (
    <div className="NavBar">
      {/* Left Side - Social Media Icons */}
      <div>Facebook</div>
      <div>Twitter</div>
      <div>Email</div>

      {/* Right Side - Sections and Connect */}
      <div>About</div>
      <div>Mint</div>
      <div>Team</div>

      {/* Connect */}
      {isConnected ? <p>Connected</p> : <button onClick={connectAccount}>Connect</button>}
    </div>
  )
}
