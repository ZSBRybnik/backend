import { findReference, validateTransfer } from "@solana/pay";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";
import { CreateHandlerOutput } from "~backend/source/server/rest/utils/createHandler/createHandler.types";

const { handler: processPayment }: CreateHandlerOutput = createHandler({
  rawHandler: async (): Promise<void> => {
    const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);
    const connection = new Connection(endpoint, "confirmed");
    const { signature } = await findReference(
      connection,
      new PublicKey("3UYtgxgGnWFV6CCoTDqywV392sDB1xkMt7hKW3CWrraD"),
      { finality: "confirmed" },
    );
    //try {
    await validateTransfer(connection, signature, {
      recipient: new PublicKey(process.env.SOLANA_MERCHANT_WALLET || ""),
      amount: new BigNumber(20),
    });
    //response.sendStatus();
    //} catch {}
  },
});

export default processPayment;
