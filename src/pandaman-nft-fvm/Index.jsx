import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { Box, Center, Heading, SimpleGrid, Image, Button } from '@chakra-ui/react'
import { getContractSpec, getToken, getSignedContract, tokensCount } from './contract'
import './index.css'

export function PandaNFT() {
  document.body.classList.remove('no-scroll')
  const [tokens, setTokens] = useState([])
  const [contractSpec, setContractSpec] = useState({})
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
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
    const signer = getSignedContract(provider)
    console.log('signer: ', signer)
    // const signer = contract.connect(provider.getSigner())
    await signer.mint(account, tokenId)
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
            />
            <Button mt="10px" colorScheme="blue" onClick={() => handleMint(token.tokenId)}>
              Mint
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
