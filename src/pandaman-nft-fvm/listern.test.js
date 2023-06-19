// function listener() {
//   if (filWssProvider) {
//     if (blockListener) {
//       filWssProvider.removeListener('block', blockListener)
//     }

//     console.log('on')
//     blockListener = throttle(async (block) => {
//       console.log('block: ', block)
//       const txReceipt = await provider.getTransactionReceipt(tx.hash)
//       if (txReceipt && txReceipt.blockNumber === block.number) {
//         const updatedToken = await getToken(tokenId)
//         setTokens((prevTokens) => {
//           const index = prevTokens.findIndex((token) => token.tokenId === tokenId)
//           if (index === -1) {
//             return prevTokens
//           }
//           const newTokens = [...prevTokens]
//           newTokens[index] = updatedToken
//           console.log('newTokens: ', newTokens)
//           return newTokens
//         })
//       }
//     }, 100)
//     filWssProvider.on('block', blockListener)
//   }
// }
