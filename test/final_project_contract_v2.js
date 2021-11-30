const finalProjectContractV2 = artifacts.require("finalProjectContractV2");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

// Note: tests only run on Kovan testnet because of chainlink aggregator.

contract("finalProjectContractV2", function (accounts) {
  const hotelWallet = accounts[1];
  const visitorWallet = accounts[2];

  beforeEach(async () => {
    // create a new instance before each test.
    instance = await finalProjectContractV2.new(10,60,2);
  });

  // tests for registerHotel() function.
  describe("Register Hotel", () => {
    // tests if contract balance increases by only the register fee.
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
      // compares the amount of wei received by the contract against the expected value.
      // checks the first 8 digits only as there were slight differences at higher precision.
      assert.equal(returnedValue.substr(0,8), expectedValue.substr(0,8));
    });
  });

  // tests for bookHotel() function.
  describe("Book Hotel", () => {
    // tests if contract balance increases only by the refundable amount.
    it("#2 should take booking fee and keep refundable amount", async () => {
      // register a hotel to get a hotel id from the emitted event.
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

      // use the hotel id and book a room 3 days from current time, i.e, eligible for refund if cancelled within the next 24 hrs.
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
      // compares the amount of wei received by the contract against the expected value (60% of booking cost).
      // checks first 8 digits only.
      assert.equal(returnedValue.substr(0,8), expectedValue.substr(0,8));
    });

    // tests if non-refundable amount is sent to hotel.
    it("#3 should transfer non-refundable funds to the hotel", async() => {
      // same as above test but checks amount received by the hotel.
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
      // expected value is 40% of booking cost.
      assert.equal(returnedValue.substr(0,8), expectedValue.substr(0,8));
    });
  });

  // tests for cancelBooking() function.
  // uses Cancelled() event for testing.
  describe("Cancel", () => {
    // tests if the msg.sender gets a refund when eligible.
    it("#4 should transfer refund to visitor when cancelled in refund period", async() => {
      // register a hotel for hotel id.
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
      // book a room for booking id.
      const bookingResult = await instance.bookHotel(
        hotelId, 
        1, 
        currentTime + 259200, 
        currentTime + 518400, {
          from: visitorWallet,
          value: 1 * 3 * usdToWei
        });
      bookingId = parseInt(bookingResult.logs[0].args.bookingId);

      // cancel using booking id and check the emitted event.
      const cancelResult = await instance.cancelBooking(
        bookingId, {
          from: visitorWallet
        });

      // event has a uint256 refundVisitor variable which holds refund value in USD, if 0, no refund.
      const refund = parseInt(cancelResult.logs[0].args.refundVisitor);
      const refundToVisitor = (refund > 0);
      assert.equal(refundToVisitor, true);
    });

    // tests if msg.sender gets no refund after refund period.
    it("#5 should transfer to hotel if refund period ended", async() => {
      // same as above but checks if no refund.
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
      // book a room 1.5 days from now, no refund if cancelled.
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
  // to-do.
  // tests for checkout() function.
  // can not be tested until the current time is more booking from date. 
  describe("Checkout", () => {
    it("#6 should transfer blocked funds to hotel", async() => {

    });
  });
*/

});
