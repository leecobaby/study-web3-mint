import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
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
        const transaction = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((mintAmount * 0.02).toString())
        })
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
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000"
          >
            It's 2078. Can the RoboPunks NFT save humans from destructive rampant NFT speculation?
            Mint RoboPunks to find out.
          </Text>
        </div>

        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#d6517d"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
                readOnly
              />
              <Button
                backgroundColor="#d6517d"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#d6517d"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint
            </Button>
          </div>
        ) : (
          <p>You must be connected to an Ethereum wallet to mint.</p>
        )}
      </Box>
    </Flex>
  )
}
