import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import RoboPunksNFT from './RoboPunksNFT.json'

const roboPunksNFTAddress = '0x775Bc97374068dF5ec70BCDB97B9790D603Fb43B'

export function MainMint({ accounts, setAccounts }) {
  const [mintAmount, setMintAmount] = useState(1)
  const isConnected = Boolean(accounts[0])

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(roboPunksNFTAddress, RoboPunksNFT.abi, signer)
      try {
        const transaction = await contract.mint(BigNumber.from(mintAmount))
        // await transaction.wait()
        console.log('transaction: ', transaction)
      } catch (err) {
        console.log('error: ', err)
      }
    }
  }

  function handleDecrement() {
    if (mintAmount <= 1) return
    setMintAmount(mintAmount - 1)
  }

  function handleIncrement() {
    if (mintAmount >= 3) return
    setMintAmount(mintAmount + 1)
  }

  return (
    <div>
      <h1>RoboPunks Mint</h1>
      <p>
        It's 2078. Can the RoboPunks NFT save from destructive rampant? Mint RoboPunks to find out.
      </p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} readOnly />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint</button>
        </div>
      ) : (
        <p>You must be connected to an Ethereum wallet to mint.</p>
      )}
    </div>
  )
}
