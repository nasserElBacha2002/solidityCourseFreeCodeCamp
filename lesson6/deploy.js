const ethers = require('ethers');
const fs = require('fs-extra');

async function main(){
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
    const wallet = new ethers.Wallet('0x296b5763c47fbe4c730af10e683696a72babeaf5b23e4fabe26877d2baefc74c', provider);
    const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", 'utf8');
    const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", 'utf8');
    const factory = new ethers.ContractFactory(abi, binary, wallet);
    const contract = await factory.deploy({gasLimit: 3000000, gasPrice: 1000000000});
    console.log(contract)
}

main()