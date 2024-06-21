import { Cell, Address, toNano } from "@ton/core";
import { hex } from "../build/main.compiled.json";
import { Blockchain,printTransactionFees } from "@ton/sandbox";
import { MainContract } from "../wrappers/MainContract";
import "@ton-community/test-utils";
 

describe("test tests", () => {

 it("test of test", async() => {

  const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
  const blockchain = await Blockchain.create();
  const initAddress = await blockchain.treasury("initAddress")
  const myContract = blockchain.openContract(

   await MainContract.createFromConfig({address: initAddress.address, number: 0}, codeCell)

  );

 

const senderWallet = await blockchain.treasury("sender");
const sentMessageResult = await myContract.sendIncrement(senderWallet.getSender(),toNano("0.05"),1);

  //console.log(printTransactionFees(sentMessageResult.transactions));
  //const arr = sentMessageResult.transactions.map(tx => flattenTransaction(tx));

  expect(sentMessageResult.transactions).toHaveTransaction({
   from: senderWallet.address,
   to: myContract.address,
   success: true,

  });


  const getData0 = await myContract.getData();

  expect(getData0.number).toEqual(1); 

  const sentMessageResult2 = await myContract.sendIncrement(senderWallet.getSender(),toNano("0.05"),2);

  expect(sentMessageResult2.transactions).toHaveTransaction({

   from: senderWallet.address,
   to: myContract.address,
   success: true,

  });

 

  const getData = await myContract.getData();

 

  expect(getData.recent_sender.toString()).toBe(senderWallet.address.toString());

  expect(getData.number).toEqual(3);

 });

})