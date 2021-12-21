import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.MEMBERSHIP_NFT_ADDRESS || process.env.MEMBERSHIP_NFT_ADDRESS == "") {
    console.log("🛑 Membership NFT Address not found.");
}

const bundleDropModule = sdk.getBundleDropModule(
    process.env.MEMBERSHIP_NFT_ADDRESS,
);

if (!process.env.ERC_20_TOKEN || process.env.ERC_20_TOKEN == "") {
    console.log("🛑 ERC-20 Address not found.");
}

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
    process.env.ERC_20_TOKEN,
);

(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT, which has 
    // a tokenId of 0.
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");
  
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }
    
    console.log(walletAddresses);
    
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();