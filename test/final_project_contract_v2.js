const finalProjectContractV2 = artifacts.require("finalProjectContractV2");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("finalProjectContractV2", function (accounts) {
  const hotelWallet = accounts[1];
  const visitorWallet = accounts[2];

  beforeEach(async () => {
    instance = await finalProjectContractV2.new(10,60,2);
  });

  describe("Register Hotel", () => {
    it("#1 should take only register fee to add a hotel", async () => {
      const balanceBefore = await web3.eth.getBalance(instance.address);
      const usdToWei = (await instance.getLatestPrice()).toNumber();

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
      const returnedValue = (balanceAfter - balanceBefore).toString();
      const expectedValue = (10*usdToWei).toString();
      assert.equal(returnedValue.substr(0,8), expectedValue.substr(0,8));
    });
  });

  describe("Book Hotel", () => {
    it("#2 should take booking fee and keep refundable amount", async () => {
      const usdToWei = (await instance.getLatestPrice()).toNumber();
      const result = await instance.registerHotel(
        "TestHotelName", 
        "TestHotelAddress", 
        100, 
        1, 
        "https://www.hotelimageurl.com", {
          from: hotelWallet, 
          value: 10 * usdToWei
          });
      hotelId = parseInt(result.logs[0].args.hotelId);

      const contractBalanceBefore = await web3.eth.getBalance(instance.address);
      const currentTime = Math.floor(new Date().getTime()/1000.0);

      await instance.bookHotel(
        hotelId, 
        1, 
        currentTime + 259200, 
        currentTime + 518400, {
          from: visitorWallet,
          value: 1 * 3 * usdToWei
        });

      const contractBalanceAfter = await web3.eth.getBalance(instance.address);
      const returnedValue = (contractBalanceAfter - contractBalanceBefore).toString();
      const expectedValue = (Math.floor(3*usdToWei*0.6)).toString();
      assert.equal(returnedValue.substr(0,8), expectedValue.substr(0,8));
    });

    it("#3 should transfer non-refundable funds to the hotel", async() => {
      const usdToWei = (await instance.getLatestPrice()).toNumber();
      const result = await instance.registerHotel(
        "TestHotelName", 
        "TestHotelAddress", 
        100, 
        1, 
        "https://www.hotelimageurl.com", {
          from: hotelWallet, 
          value: 10 * usdToWei
          });
      hotelId = parseInt(result.logs[0].args.hotelId);

      const hotelBalanceBefore = await web3.eth.getBalance(hotelWallet);
      const currentTime = Math.floor(new Date().getTime()/1000.0);

      await instance.bookHotel(
        hotelId, 
        1, 
        currentTime + 259200, 
        currentTime + 518400, {
          from: visitorWallet,
          value: 1 * 3 * usdToWei
        });

      const hotelBalanceAfter = await web3.eth.getBalance(hotelWallet);
      const returnedValue = (hotelBalanceAfter - hotelBalanceBefore).toString();
      const expectedValue = (Math.floor(3*usdToWei*0.4)).toString();
      assert.equal(returnedValue.substr(0,8), expectedValue.substr(0,8));
    });
  });

  describe("Cancel", () => {
    it("#4 should transfer refund to visitor when cancelled in refund period", async() => {
      const usdToWei = (await instance.getLatestPrice()).toNumber();
      const result = await instance.registerHotel(
        "TestHotelName", 
        "TestHotelAddress", 
        100, 
        1, 
        "https://www.hotelimageurl.com", {
          from: hotelWallet, 
          value: 10 * usdToWei
          });
      hotelId = parseInt(result.logs[0].args.hotelId);

      const currentTime = Math.floor(new Date().getTime()/1000.0);
      const bookingResult = await instance.bookHotel(
        hotelId, 
        1, 
        currentTime + 259200, 
        currentTime + 518400, {
          from: visitorWallet,
          value: 1 * 3 * usdToWei
        });
      bookingId = parseInt(bookingResult.logs[0].args.bookingId);

      const cancelResult = await instance.cancelBooking(
        bookingId, {
          from: visitorWallet
        });
      const refund = parseInt(cancelResult.logs[0].args.refundVisitor);
      const refundToVisitor = (refund > 0);
      assert.equal(refundToVisitor, true);
    });

    it("#5 should transfer to hotel if refund period ended", async() => {
      const usdToWei = (await instance.getLatestPrice()).toNumber();
      const result = await instance.registerHotel(
        "TestHotelName", 
        "TestHotelAddress", 
        100, 
        1, 
        "https://www.hotelimageurl.com", {
          from: hotelWallet, 
          value: 10 * usdToWei
          });
      hotelId = parseInt(result.logs[0].args.hotelId);

      const currentTime = Math.floor(new Date().getTime()/1000.0);
      const bookingResult = await instance.bookHotel(
        hotelId, 
        1, 
        currentTime + 129600, 
        currentTime + 388800, {
          from: visitorWallet,
          value: 1 * 3 * usdToWei
        });
      bookingId = parseInt(bookingResult.logs[0].args.bookingId);

      const cancelResult = await instance.cancelBooking(
        bookingId, {
          from: visitorWallet
        });
      const refundToVisitor = parseInt(cancelResult.logs[0].args.refundVisitor);
      assert.equal(refundToVisitor, 0);
    });
  });

/*
  describe("Checkout", () => {
    it("#6 should transfer blocked funds to hotel", async() => {

    });
  });
*/

});
