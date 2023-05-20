import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x2e6735dAd389cC269a1b7a5104EE1daBC26f718e");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Mariposas Doradas",
        description: "This NFT will give you access to EncouragementDAO!",
        image: readFileSync("scripts/assets/mariposas.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
