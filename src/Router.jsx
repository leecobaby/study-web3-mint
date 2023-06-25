import { createBrowserRouter } from 'react-router-dom'
import { RoboPunksNFT } from './robo-punks-nft'
import { PandaNFT } from './pandaman-nft-fvm'
import { StarknetNFT } from './starknet-nft/Index.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RoboPunksNFT
  },
  {
    path: '/panda',
    Component: PandaNFT
  },
  {
    path: '/starknet',
    Component: StarknetNFT
  }
])
