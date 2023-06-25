import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { Box, Center, Heading, SimpleGrid, Image, Button } from '@chakra-ui/react'
import { createCssElement } from '../utils/style'
import { getContractSpec, getToken, getSignedContract, tokensCount } from './contract'

export function PandaNFT() {
  document.body.classList.remove('no-scroll')
  const [tokens, setTokens] = useState([])
  const [contractSpec, setContractSpec] = useState({})
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  useEffect(() => {
    let cssEl = createCssElement('/style/pandaman-nft.css')
    return () => {
      document.head.removeChild(cssEl)
    }
  }, [])

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log('provider: ', provider)
        try {
          await window.ethereum.enable()
          setProvider(provider)
          const accounts = await provider.listAccounts()
          setAccount(accounts[0])
        } catch (error) {
          console.error(error)
        }
      }
    }
    initProvider()

    const fetchTokens = async () => {
      const tokenIds = Array.from({ length: tokensCount }, (_, i) => i)
      const tokenData = await Promise.all(tokenIds.map(getToken))
      setTokens(tokenData)
      console.log('tokenData: ', tokenData)
    }
    fetchTokens()

    const fetchContractSpec = async () => {
      const contractSpec = await getContractSpec()
      setContractSpec(contractSpec)
    }
    fetchContractSpec()
  }, [])

  const handleMint = async (tokenId) => {
    const tokenIndex = tokens.findIndex((token) => token.tokenId === tokenId)
    if (tokenIndex === -1) {
      return
    }
    const updatedTokens = [...tokens]
    updatedTokens[tokenIndex] = {
      ...updatedTokens[tokenIndex],
      isLoading: true
    }
    setTokens(updatedTokens)

    try {
      const signer = getSignedContract(provider)
      // wake up metamask to sign the transaction
      const tx = await signer.mint(account, tokenId)
      console.log('tx: ', tx)
      await tx.wait()
      console.log('Transaction confirmed')

      const intervalId = setInterval(async () => {
        console.log('Checking', tokenId)
        const updatedToken = await getToken(tokenId)
        if (updatedToken.owner) {
          const updatedTokens = [...tokens]
          updatedTokens[tokenIndex] = { ...updatedToken, isLoading: false }
          setTokens(updatedTokens)
          console.log('updatedTokens: ', updatedTokens)
          clearInterval(intervalId)
        }
      }, 1000)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  return (
    <Box>
      <Center flexDirection="column" bg="gray.100" h="150px">
        <Heading>Welcome to Panda NFT</Heading>
        <Heading as="h3" size="md" color="gray.500">
          {contractSpec.name} ({contractSpec.symbol})
        </Heading>
        {provider && account ? (
          <Heading as="h3" size="md" color="gray.500">
            {account}
          </Heading>
        ) : (
          <Button onClick={() => window.ethereum.enable()} colorScheme="blue">
            Connect to MetaMask
          </Button>
        )}
      </Center>

      <SimpleGrid columns={[1, 2, 4]} spacing="40px" p="40px">
        {tokens.map((token) => (
          <Box key={token.tokenId} maxWidth={240} display="flex" flexDirection="column">
            <Image
              src={token.imageUrl || '/question-mark.png'}
              alt={`NFT ${token.tokenId}`}
              width="100%"
              height="100%"
              objectFit="contain"
              transition="all 0.2s ease-in-out"
              _hover={{
                filter: 'brightness(0.8)'
              }}
            />
            <Button
              mt="10px"
              colorScheme="blue"
              isLoading={token.isLoading}
              transition="all 0.2s ease-in-out"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
              }}
              onClick={() => handleMint(token.tokenId)}
            >
              {token.isLoading ? 'Minting...' : 'Mint'}
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
