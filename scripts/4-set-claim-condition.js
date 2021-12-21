import sdk from "./1-initialize-sdk.js";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.MEMBERSHIP_NFT_ADDRESS || process.env.MEMBERSHIP_NFT_ADDRESS == "") {
    console.log("🛑 Membership NFT Address not found.");
}

const bundleDrop = sdk.getBundleDropModule(
    process.env.MEMBERSHIP_NFT_ADDRESS,
);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    // Specify conditions.
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });
    
    
    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log("✅ Sucessfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})()