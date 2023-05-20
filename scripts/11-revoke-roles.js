import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0xf89Ae7D1A3b612B7Ee908ADE90138af07327174A");

(async () => {
	try {
		// Log the current roles.
    const allRoles = await token.roles.getAll();

    console.log("👀 Roles that exist right now:", allRoles);

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "🎉 Roles after revoking ourselves",
      await token.roles.getAll()
    );
    console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");

	} catch (error) {
		console.error ("Failed to revoke ourselves from the DAO treasury", error);
	}
})();