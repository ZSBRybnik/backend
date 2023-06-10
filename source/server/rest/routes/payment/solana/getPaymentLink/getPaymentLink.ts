import { encodeURL } from "@solana/pay";
import { Keypair, PublicKey } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~backend/source/server/rest/utils/createHandler/createHandler.types";

const { handler: getPaymentLink }: CreateHandlerOutput = createHandler({
  rawHandler: async ({ response }: RawHandlerArguments): Promise<void> => {
    const recipient = new PublicKey(process.env.SOLANA_MERCHANT_WALLET || "");
    const amount = new BigNumber(20);
    const reference = new Keypair().publicKey;
    const label = "ZSB Rybnik store";
    const message = "ZSB Rybnik store - your order - #001234";
    const memo = "JC#4098";
    const url = encodeURL({
      recipient,
      amount,
      reference,
      label,
      message,
      memo,
    });
    response.sendWithValidFormat({ data: { url } });
  },
});

export default getPaymentLink;
