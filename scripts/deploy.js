const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Mario", "Luigi", "Toad"], // Names
    [
      "https://i.imgur.com/w31FmCJ.jpeg", // Images
      "https://i.imgur.com/3Dy6viP.jpeg",
      "https://cdn.vox-cdn.com/thumbor/CVKQO8SiQ2oFJEg5ui1Yz62HTLw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13109287/tum.jpg",
    ],
    [2000, 4000, 3000], // HP values
    [1000, 500, 2500],
    "Kirby",
    "https://i.imgur.com/zPFuLVO.jpeg",
    20000,
    100
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;

  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  // Get the value of the NFT's URI.
  // Platforms like OpenSea and Rarible know to hit tokenURI since that's the standard way to retrieve the NFTs metadata.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
