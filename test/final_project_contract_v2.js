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
  const refundPcnt = 60;

/*
  it("should assert true", async function () {
    await finalProjectContractV2.deployed();
    return assert.isTrue(true);
  });
*/

  beforeEach(async () => {
    instance = await finalProjectContractV2.new(10,60,2);
    const usdToWei = 232156720000000//(await instance.getLatestPrice()).toNumber();
    await instance.registerHotel(
      "FirstHotelName", 
      "FirstHotelAddress", 
      100, 
      1, 
      "https://www.hotelimageurl.com", {
         from: ownerWallet, 
         value: registerFee * usdToWei
        });
  });

/*
  it("should add first account as owner using OpenZeppelin Ownable", async () => {
    assert.strictEqual(await instance.owner(), ownerWallet);
  });
*/

  it("#1 should take only register fee to add a hotel", async () => {
    const balanceBefore = await web3.eth.getBalance(instance.address);

    await instance.registerHotel(
      "hotelName", 
      "hotelAddress", 
      10, 
      5, 
      "hotelImg", {
        from: hotelWallet, 
        value: 10 * usdToWei
      });

    const balanceAfter = await web3.eth.getBalance(instance.address);
    assert.equal(balanceAfter - balanceBefore, 10 * usdToWei);
  });

describe("Book Hotel", () => {
  it("#2 should take booking fee from the visitor and block refundable funds", async () => {
    const contractBalanceBefore = await web3.eth.getBalance(instance.address);
    const currentTime = Math.floor(new Date().getTime()/1000.0);

    await instance.bookHotel(
      1, 
      1, 
      currentTime + 259200, 
      currentTime + 518400, {
        from: visitorWallet,
        value: 1 * 3 * usdToWei
      });

    const contractBalanceAfter = await web3.eth.getBalance(instance.address);
    assert.equal(contractBalanceAfter - contractBalanceBefore, Math.floor((3*usdToWei*60)/100));
  });

  it("#3 should take booking fee from the visitor and transfer non-refundabe funds to the hotel", async() => {
    const hotelBalanceBefore = await web3.eth.getBalance(hotelWallet);
    const currentTime = Math.floor(new Date().getTime()/1000.0);

    await instance.bookHotel(
      1, 
      1, 
      currentTime + 259200, 
      currentTime + 518400, {
        from: visitorWallet,
        value: 1 * 3 * usdToWei
      });

    const hotelBalanceAfter = await web3.eth.getBalance(hotelWallet);
    assert.equal(hotelBalanceAfter - hotelBalanceBefore, Math.floor((3*usdToWei*40)/100));
  });
});

/*
  it("#2 should check if visitor books in booking period", async () => {
    const usdToWei = (await instance.getLatestPrice()).toNumber();
    const currentTime = Math.floor(new Date().getTime()/1000.0);

    await instance.bookHotel(1, 1, currentTime + 302400, 1, { from: visitorWallet, value: 1 * usdToWei });

    
  });

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
