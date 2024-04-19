const ethers = require('ethers');
const fs = require('fs-extra');
require('dotenv').config();

async function main(){
    const provider = new ethers.JsonRpcProvider(process.env.URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", 'utf8');
    const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", 'utf8');
    const factory = new ethers.ContractFactory(abi, binary, wallet);
    const contract = await factory.deploy(); 
    const transaction = await contract.deploymentTransaction(1);
    const currentFavoriteNumber = await contract.retrieve();
    console.log(currentFavoriteNumber.toString());
    const nonce = await wallet.getNonce();
    const transactionResponse = await contract.store("13", {nonce: nonce});
    const transactionReceipt = await transactionResponse.wait(1);
    const updateFavoriteNumber = await contract.retrieve();
    console.log(updateFavoriteNumber.toString());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
})