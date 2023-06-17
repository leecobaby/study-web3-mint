import { RoboPunksNFT } from './robo-punks-nft'
import { PandaNFT } from './pandaman-nft-fvm'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RoboPunksNFT
  },
  {
    path: '/panda',
    Component: PandaNFT
  }
])
