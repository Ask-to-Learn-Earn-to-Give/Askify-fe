import { create as ipfsHttpClient } from 'ipfs-http-client';
const projectID = '2QXX7CVuy55vGeSCi2ntWSx39lg';
const projectSecretKey = '9ab74124c25fdacc432843ec37076620';
// const projectID = process.env.IPFS_PROJECT_ID;
// const projectSecretKey = process.env.IPFS_PROJECT_SECRET_KEY;
const subdomain = 'https://nftsontm.infura-ipfs.io';
const auth = `Basic ${Buffer.from(`${projectID}:${projectSecretKey}`).toString(
  'base64'
)}`;
const client = ipfsHttpClient({
  host: 'infura-ipfs.io',
  port: '5001',
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});
const uploadToIPFS = async (file) => {
  try {
    const added = await client.add({ content: file });
    const url = `${subdomain}/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.log('error while upload Image');
  }
};
export { uploadToIPFS };
