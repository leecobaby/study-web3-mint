import { useState, useEffect } from 'react'
import { Box, Center, Heading, SimpleGrid, Image, Button } from '@chakra-ui/react'
import { getContractSpec, getToken, getWritableContract, tokensCount } from './contract'
import './index.css'

export function PandaNFT() {
  document.body.classList.remove('no-scroll')
  const [tokens, setTokens] = useState([])
  const [contractSpec, setContractSpec] = useState({})

  useEffect(() => {
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

  return (
    <Box>
      <Center bg="gray.100" h="200px">
        <Heading>Welcome to Panda NFT</Heading>
        <Heading as="h3" size="md" color="gray.500">
          {contractSpec.name} ({contractSpec.symbol})
        </Heading>
      </Center>
      <SimpleGrid columns={[1, 2, 4]} spacing="40px" p="40px">
        {tokens.map((token) => (
          <Box key={token.tokenId}>
            <Image src={token.imageUrl} alt={`NFT ${token.tokenId}`} />
            <Button mt="10px" colorScheme="blue">
              Mint
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
