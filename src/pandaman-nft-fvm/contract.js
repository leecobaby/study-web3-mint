import { ethers } from 'ethers'
import { convertIpfsUriToHttpUrl } from '../utils/ipfsUtil'

const contractAddress = '0x86c95d737d665381e3046cC42703724Ace18eBDD'
const tokensCount = 10
const jsonRPCEndpoint = 'https://api.calibration.node.glif.io/'
const abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function ownerOf(uint) view returns (address)',
  'function tokenURI(uint) view returns (string)',
  'function mint(address, uint)'
]
const contract = new ethers.Contract(
  contractAddress,
  abi,
  new ethers.providers.JsonRpcProvider(jsonRPCEndpoint)
)
// let browserProvider = null
// let accounts = null
// const initBrowserProvider = async () => {
//   if (window.ethereum) {
//     browserProvider = new ethers.providers.Web3Provider(window.ethereum)

//     try {
//       // Request account access if needed
//       await window.ethereum.enable()
//       const accounts = await browserProvider.listAccounts()
//     } catch (error) {
//       // User denied account access...
//       console.log('User denied account access')
//     }
//   }
// }

const getSignedContract = (provider) => {
  const signer = provider.getSigner()
  return new ethers.Contract(contractAddress, abi, signer)
}

const getContractSpec = async () => {
  return {
    name: await contract.name(),
    symbol: await contract.symbol()
  }
}

const getToken = async (tokenId) => {
  let owner = ''
  try {
    owner = await contract.ownerOf(tokenId)
  } catch (error) {}

  let tokenURI = ''
  let imageUrl = ''
  try {
    tokenURI = await contract.tokenURI(tokenId)
    if (tokenURI && tokenURI.startsWith('ipfs://')) {
      const metadataHttpURL = convertIpfsUriToHttpUrl(tokenURI)
      const response = await fetch(metadataHttpURL)
      const { image } = await response.json()
      imageUrl = convertIpfsUriToHttpUrl(image)
    }
    console.log('image', imageUrl)
  } catch (error) {
    // console.log('error', error)
  }

  return {
    owner,
    imageUrl,
    tokenId,
    tokenURI
  }
}

export { getContractSpec, getToken, getSignedContract, tokensCount }
