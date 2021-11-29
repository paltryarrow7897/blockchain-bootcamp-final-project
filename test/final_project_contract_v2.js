const finalProjectContractV2 = artifacts.require("finalProjectContractV2");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("finalProjectContractV2", function (accounts) {
  const ownerWallet = accounts[0];
  const hotelWallet = accounts[1];
  const visitorWallet = accounts[2];

  const registerFee = 10;

/*
  it("should assert true", async function () {
    await finalProjectContractV2.deployed();
    return assert.isTrue(true);
  });
*/

  beforeEach(async () => {
    instance = await finalProjectContractV2.new(registerFee, 60, 2);
    const usdToWei = (await instance.getLatestPrice()).toNumber();
    await instance.registerHotel("H1", "HA1", 10, 1, "HI1", { from: ownerWallet, value: registerFee * usdToWei});
  });

/*
  it("should add first account as owner using OpenZeppelin Ownable", async () => {
    assert.strictEqual(await instance.owner(), ownerWallet);
  });
*/

  it("#1 should take only register fee to add a hotel", async () => {
    const usdToWei = (await instance.getLatestPrice()).toNumber();
    const balanceBefore = await web3.eth.getBalance(instance.address);

    await instance.registerHotel(
      "hotelName", "hotelAddress", 10, 25, "hotelImg", {
        from: hotelWallet, value: registerFee * usdToWei
      });

    const balanceAfter = await web3.eth.getBalance(instance.address);
    assert.equal(balanceAfter - balanceBefore, registerFee * usdToWei);
  });

  it("#2 should check if visitor books in booking period", async () => {
    const usdToWei = (await instance.getLatestPrice()).toNumber();
    const currentTime = Math.floor(new Date().getTime()/1000.0);

    await instance.bookHotel(1, 1, currentTime + 302400, 1, { from: visitorWallet, value: 1 * usdToWei });

    
  });

/*
  it("#3 should revert if rooms are not available", async () => {

  });

  it("#4 should take only booking cost to book rooms", async () => {

  });

  it("#5 should revert if someone other than visitor ckecks out", async () => {

  });

  it("#6 should revert if someone other than visitor cancels", async () => {

  });

  it("#7 should refund visitor if eligible", async () => {

  });
*/
});
