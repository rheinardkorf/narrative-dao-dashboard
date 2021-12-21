import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

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
    await bundleDrop.createBatch([
      {
        name: "@RemarkableDAO Genesis NFT",
        description: "This NFT will give you access to RemarkableDAO!",
        image: readFileSync("scripts/assets/remarkable_dao_genesis.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()