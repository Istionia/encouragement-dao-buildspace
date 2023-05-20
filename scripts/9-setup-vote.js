import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0x40b85990fDE61d21341a0045d2711f535c7c22dD");

// This is our ERC-20 contract.
const token = sdk.getToken("0xf89Ae7D1A3b612B7Ee908ADE90138af07327174A");

(async () => {
	try {
		// Give our treasury the power to mint additional tokens as necessary.
		await token.roles.grant("minter", vote.getAddress());

		console.log(
			"Successfully gave vote contract permissions to act on token contract"
		);
	} catch (error) {
		console.error(
			"failed to grant vote contract permissions on token contract",
			error
		);
		process.exit(1);
	}

	try {
		// Grab our wallet's token balance, remember -- WE hold basically the wallet's supply right now!
		const ownedTokenBalance = await token.balanceOf(
			process.env.WALLET_ADDRESS
		);

		// Grab 90% of the supply that we hold.
		const ownedAmount = ownedTokenBalance.displayValue;
		const percent90 = Number(ownedAmount) / 100 * 90;

		// Transfer 90% of the supply to our voting contract.
		await token.transfer(
			vote.getAddress(),
			percent90
		);

		console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
	} catch (err) {
		console.error("failed to transfer tokens to vote contract", err)
	}
})();