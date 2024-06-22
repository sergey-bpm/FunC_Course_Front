import { address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { compile, NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const myContract = MainContract.createFromConfig(
    {
      number: 0,
      address: address("kQC8vYL1Y5ffKXce7bUE0q72LYB654f4cFaZeqcsSlpWmoEA"),
      owner_address: address(
        "kQC8vYL1Y5ffKXce7bUE0q72LYB654f4cFaZeqcsSlpWmoEA"
      ),
    },
    await compile("MainContract")
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano("0.05"));

  await provider.waitForDeploy(myContract.address);
}