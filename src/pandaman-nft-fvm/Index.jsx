import { Box, Center, Heading, SimpleGrid, Image, Button } from '@chakra-ui/react'
import './index.css'

export function PandaNFT() {
  document.body.classList.remove('no-scroll')
  return (
    <Box className=".panda-container">
      <Center bg="gray.100" h="200px">
        <Heading>Welcome to Panda NFT</Heading>
      </Center>
      <SimpleGrid columns={[1, 2, 4]} spacing="40px" p="40px">
        <Box>
          <Image src="https://via.placeholder.com/300x300" alt="NFT 1" />
          <Button mt="10px" colorScheme="blue">
            Mint
          </Button>
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/300x300" alt="NFT 2" />
          <Button mt="10px" colorScheme="blue">
            Mint
          </Button>
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/300x300" alt="NFT 3" />
          <Button mt="10px" colorScheme="blue">
            Mint
          </Button>
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/300x300" alt="NFT 4" />
          <Button mt="10px" colorScheme="blue">
            Mint
          </Button>
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/300x300" alt="NFT 5" />
          <Button mt="10px" colorScheme="blue">
            Mint
          </Button>
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/300x300" alt="NFT 6" />
          <Button mt="10px" colorScheme="blue">
            Mint
          </Button>
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/300x300" alt="NFT 7" />
          <Button mt="10px" colorScheme="blue">
            Mint
          </Button>
        </Box>
        <Box>
          <Image src="https://via.placeholder.com/300x300" alt="NFT 8" />
          <Button mt="10px" colorScheme="blue">
            Mint
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
