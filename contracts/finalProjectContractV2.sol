// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/// @title Blockchain Developer Bootcamp Final Project: Hotel Booking dapp.
/// @author Kushagra Jain (github: paltryarrow7897)
/// @dev All function calls are currently implemented without side effects.
contract finalProjectContractV2 is Ownable {
    
    /// @dev uses chainlink aggregator to get ETH price feed
    AggregatorV3Interface internal priceFeed;
    
    // State variables.
    uint256 public hotelId;
    uint256 public bookingId;
    uint256 public registerFee;
    uint256 public refundPercent;
    uint256 public refundPeriod;
    uint256[] visitorBookings;

    enum State {Planned, Completed, Cancelled}
    
    struct Hotel {
        address hotelOwner;
        string hotelName;
        string hotelAddress;
        uint256 totalRooms;
        uint256 availableRooms;
        uint256 pricePerNight;
        bool registered;
        string imgUrl;
    }
    
    struct Booking {
        address visitor;
        uint256 hotelId;
        uint256 rooms;
        uint256 bookingTime;
        uint256 fromTime;
        uint256 toTime;
        uint256 bookingCost;
        State status;
    }
    
    // Mappings.
    mapping(uint256 => Hotel) hotelIdToHotel;
    mapping(uint256 => Booking) bookingIdToBooking;
    mapping(address => uint256[]) visitorToVisitorBookings;
    
    
    // Events.
    event HotelRegistered(uint256 hotelId, Hotel newHotel);
    event Booked(uint256 bookingId, Booking newBooking);
    event Completed(uint256 bookingId, uint256 timestamp);
    event Cancelled(uint256 bookingId, uint256 refundVisitor, uint256 timestamp);
    
    receive() external payable {}
    
    constructor(uint256 _registerFee, uint256 _refundPercent, uint256 _refundPeriod) {
        registerFee = _registerFee;
        refundPercent = _refundPercent;
        refundPeriod = _refundPeriod;
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }
    
    
    // Modifiers.

    /// @notice Checks if the Hotel is registered using @param _hotelId
    modifier isRegistered(uint256 _hotelId) {
        require(hotelIdToHotel[_hotelId].registered == true);
        _;
    }
    
    /// @notice Checks if @param _rooms number of rooms are available in @param _hotelId hotel
    modifier isAvailable(uint256 _hotelId, uint256 _rooms) {
        require(hotelIdToHotel[_hotelId].availableRooms >= _rooms);
        _;
    }
    
    /// @notice Checks if a @param _bookingId booking is planned
    modifier isPlanned(uint256 _bookingId) {
        require(bookingIdToBooking[_bookingId].status == State.Planned);
        _;
    }
    
    /// @notice Checks if the msg.sender is the visitor for the @param _bookingId booking
    modifier isVisitor(uint256 _bookingId) {
        require(bookingIdToBooking[_bookingId].visitor == msg.sender);
        _;
    }
    
    
    // Owner functions.

    /// @notice function to modify @param _registerFee for hotel registration
    /// @notice set to 50 on deploying
    function setRegisterFee(uint256 _registerFee) external onlyOwner {
        registerFee = _registerFee;
    }
    
    /// @notice function to modify @param _refundPercent for refund on cancellation
    /// @notice set to 60 on deploying
    function setRefundPercent(uint256 _refundPercent) external onlyOwner {
        refundPercent = _refundPercent;
    }
    
    /// @notice function to modify @param _refundPeriod (in days) for refund period
    /// @notice set to 2 (days) on deploying, i.e, cancel at least 48 hrs before From Date at 00:00 hrs to get refunds
    function setRefundPeriod(uint256 _refundPeriod) external onlyOwner {
        refundPeriod = _refundPeriod;
    }
    
    /// @notice function to fetch contract balance, set to only owner, only for fun, will change later
    function getContractBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    /// @notice the next two functions are required because the smart contract uses USD/ETH price changes
    /// @notice if price fluctuates a lot, ETH funds in contract address may become a lot of run out completely
    /// @notice plan to make the contract a liquidity provider for sustainance
    
    /// @notice function to withdraw funds, to be deleted
    function withdrawFunds(uint256 _amount) external onlyOwner returns (bool) {
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success);
        return true;
    }
    
    /// @notice function to supply funds, to be deleted
    function supplyFunds() external onlyOwner payable returns (bool) {
        (bool success, ) = address(this).call{value: msg.value}("");
        require(success);
        return true;
    }


    // Read functions.

    /// @notice get USD/Wei price from chainlink aggregator
    function getLatestPrice() public view returns (uint256) {
        (,int price,,,) = priceFeed.latestRoundData();
        return uint256((10**26)/price);
    }

    /// @notice get hotel details using @param _hotelId
    function getHotelStruct(uint256 _hotelId) public view returns (Hotel memory) {
        return hotelIdToHotel[_hotelId];
    }

    /// @notice get booking details using @param _bookingId
    function getBookingStruct(uint256 _bookingId) public view returns (Booking memory) {
        return bookingIdToBooking[_bookingId];
    }

    /// @notice get all bookings of a visitor using @param _visitor address
    function getVisitorBookings(address _visitor) public view returns (uint256[] memory) {
        return visitorToVisitorBookings[_visitor];
    }
     
    
    // Hotel functions.

    /// @notice Payable function to let an account register their hotel
    /// @notice Takes a registration fee when called
    /// @param _name Name of the Hotel
    /// @param _address Address of the Hotel
    /// @param _totalRooms Number of Rooms to be listed
    /// @param _pricePerNight Price for staying for a night 
    /// @param _imgUrl Hotel Image URL 
    /// @return true if success
    /// @dev emits a HotelRegistered event
    function registerHotel(
        string memory _name,
        string memory _address,
        uint256 _totalRooms,
        uint256 _pricePerNight,
        string memory _imgUrl)
        external payable returns (bool) {
            
            hotelId += 1;
            Hotel memory newHotel = Hotel({
                hotelOwner: msg.sender,
                hotelName: _name,
                hotelAddress: _address,
                totalRooms: _totalRooms,
                availableRooms: _totalRooms,
                pricePerNight: _pricePerNight,
                imgUrl: _imgUrl,
                registered: true
            });
            
            (bool success, ) = address(this).call{value: registerFee * getLatestPrice()}("");
            require(success);
            hotelIdToHotel[hotelId] = newHotel;
            
            emit HotelRegistered(hotelId, newHotel);
            return true;
    }
    
    /// @notice Public function to calculate booking cost
    /// @param _hotelId Hotel ID of the hotel to be booked
    /// @param _rooms Number of Rooms to be booked
    /// @param _nights Number of Nights staying
    /// @return booking cost
    function getBookingCost(uint256 _hotelId, uint256 _rooms, uint256 _nights) public view returns (uint256) {
        uint256 bookingCost = hotelIdToHotel[_hotelId].pricePerNight * _nights * _rooms;
        return bookingCost;
    }
    
    
    // Visitor functions.

    /// @notice Payable function to let an account book a hotel
    /// @notice Takes booking fee and splits in two parts
    /// @param _hotelId Hotel ID of the hotel to be booked
    /// @param _rooms Number of rooms to be booked
    /// @param _fromTime Epoch time of the From Date at 00:00 hrs of booking
    /// @param _toTime Epoch time of the To Date at 23:59 hrs of booking
    /// @return true if success
    /// @dev emits a Booked event
    function bookHotel(
        uint256 _hotelId, 
        uint256 _rooms, 
        uint256 _fromTime, 
        uint256 _toTime) 
        external payable isRegistered(_hotelId) isAvailable(_hotelId, _rooms) returns (bool) {
            
            require(_fromTime - block.timestamp <= 604800 && _fromTime - block.timestamp >= 86400);
            require(_toTime - _fromTime >= 86400);
            uint256 _nights = (_toTime + 86399 - _fromTime)/86400;
            uint256 cost = getBookingCost(_hotelId, _rooms, _nights);
            require(msg.value == cost * getLatestPrice());
            
            bookingId += 1;
            Booking memory newBooking = Booking({
                visitor: msg.sender,
                hotelId: _hotelId,
                rooms: _rooms,
                bookingTime: block.timestamp,
                fromTime: _fromTime,
                toTime: _toTime + 86399,
                bookingCost: cost,
                status: State.Planned
            });
            
            /// @dev send non-refundable amount immediately to hotel owner.
            (bool success1, ) = payable(hotelIdToHotel[_hotelId].hotelOwner).call{value: (cost * getLatestPrice() * (100 - refundPercent))/100 }("");
            require(success1);
            
            /// @dev block maximum refund amount with smart contract.
            (bool success2, ) = address(this).call{value: (cost * getLatestPrice() * refundPercent)/100 }("");
            require(success2);

            visitorToVisitorBookings[msg.sender].push(bookingId);
            hotelIdToHotel[_hotelId].availableRooms -= _rooms;
            bookingIdToBooking[bookingId] = newBooking;
            
            emit Booked(bookingId, newBooking);
            return true;
    }
    
    /// @notice Manually let the visitor checkout
    /// @notice Transfers the blocked booking fee to the hotel
    /// @param _bookingId Booking ID of the booking to checkout
    /// @return true if success
    /// @dev emits a Completed event
    function checkout(uint256 _bookingId) external isPlanned(_bookingId) isVisitor(_bookingId) returns (bool) {
        require(block.timestamp > bookingIdToBooking[_bookingId].fromTime);
        uint256 hId = bookingIdToBooking[_bookingId].hotelId;
        uint256 bCost = bookingIdToBooking[_bookingId].bookingCost;
        
        /// @dev send blocked amount to hotel owner.
        (bool success, ) = payable(hotelIdToHotel[hId].hotelOwner).call{value: (bCost * getLatestPrice() * refundPercent)/100 }("");
        require(success);

        bookingIdToBooking[_bookingId].status = State.Completed;
        
        emit Completed(_bookingId, block.timestamp);
        return true;
    }
    
    /// @notice Let the visitor cancel a booking
    /// @notice Transfers refunds if any or transfers to hotel
    /// @param _bookingId Booking ID of the booking to cancel
    /// @return true if success
    /// @dev emits a Cancelled event
    function cancelBooking(uint256 _bookingId) external isPlanned(_bookingId) isVisitor(_bookingId) returns (bool) {
        uint256 hId = bookingIdToBooking[_bookingId].hotelId;
        uint256 bCost = bookingIdToBooking[_bookingId].bookingCost;
        uint256 refundVisitor = getRefundAmount(_bookingId);
        
        /// @dev send to visitor if eligible for refund
        if (refundVisitor > 0) {
            (bool success1, ) = payable(msg.sender).call{value: refundVisitor * getLatestPrice() }("");
            require(success1);
        }
        
        /// @dev else send to hotel 
        else {
            (bool success2, ) = payable(hotelIdToHotel[hId].hotelOwner).call{value: (bCost * getLatestPrice() * refundPercent)/100 }("");
            require(success2);
        }
        
        hotelIdToHotel[hId].availableRooms += bookingIdToBooking[_bookingId].rooms;
        bookingIdToBooking[_bookingId].status = State.Cancelled;
        
        emit Cancelled(_bookingId, refundVisitor, block.timestamp);
        return true;
    }
    
    // Internal functions.

    /// @notice Internal function to calculate refunds if visitor cancels a booking
    /// @param _bookingId Booking ID of the booking to cancel
    /// @return refund amount
    function getRefundAmount(uint256 _bookingId) internal view returns (uint256) {
        uint256 refundVisitor = 0;
        uint256 bCost = bookingIdToBooking[_bookingId].bookingCost;
        
        /// @dev checks if visitor is eligible for a refund
        if (bookingIdToBooking[_bookingId].fromTime - block.timestamp >= 86400 * refundPeriod) {
            refundVisitor = (bCost * refundPercent)/100;
        }
        return refundVisitor;
    }
    
}