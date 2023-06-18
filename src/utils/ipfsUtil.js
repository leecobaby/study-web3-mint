/**
 * Converts an IPFS URI to an HTTP URL.
 *
 * @param {string} ipfsURI - The IPFS URI to convert.
 * @returns {string} The converted HTTP URL.
 */
const convertIpfsUriToHttpUrl = (ipfsURI) => {
  const subURL = ipfsURI.replace('ipfs://', 'ipfs/')
  return `https://ipfs.io/${subURL}`
}

export { convertIpfsUriToHttpUrl }
