import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.DAO_APP_ADDRESS || process.env.DAO_APP_ADDRESS == "") {
    console.log("🛑 DAO App Address not found.");
}

const app = sdk.getAppModule(process.env.DAO_APP_ADDRESS);

(async () => {
    try {
      const bundleDropModule = await app.deployBundleDropModule({
        // The collection's name, ex. CryptoPunks
        name: "RemarkableDAO Membership",
        // A description for the collection.
        description: "RemarkableDAO exists to tokenise and gamify all those moments in life that make us all remarkable. From incidental events; formal education; informal learning and everything else that life throws at us. ",
        // The image for the collection that will show up on OpenSea.
        image: readFileSync("scripts/assets/remarkable_dao_genesis.png"),
        // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
        // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
        // you can set this to your own wallet address if you want to charge for the drop.
        primarySaleRecipientAddress: ethers.constants.AddressZero,
      });
      
      console.log(
        "✅ Successfully deployed bundleDrop module, address:",
        bundleDropModule.address,
      );
      console.log(
        "✅ bundleDrop metadata:",
        await bundleDropModule.getMetadata(),
      );
    } catch (error) {
      console.log("failed to deploy bundleDrop module", error);
    }
  })()