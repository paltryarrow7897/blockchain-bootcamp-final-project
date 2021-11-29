// SPDX-License-Identifier: MIT

// Comissionless Hotel Listing dApp.
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract finalProjectContractV2 is Ownable {
    
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
    modifier isRegistered(uint256 _hotelId) {
        require(hotelIdToHotel[_hotelId].registered == true);
        _;
    }
    
    modifier isAvailable(uint256 _hotelId, uint256 _rooms) {
        require(hotelIdToHotel[_hotelId].availableRooms >= _rooms);
        _;
    }
    
    modifier isPlanned(uint256 _bookingId) {
        require(bookingIdToBooking[_bookingId].status == State.Planned);
        _;
    }
    
    modifier isVisitor(uint256 _bookingId) {
        require(bookingIdToBooking[_bookingId].visitor == msg.sender);
        _;
    }
    
    
    // Owner functions.
    function setRegisterFee(uint256 _registerFee) external onlyOwner {
        registerFee = _registerFee;
    }
    
    function setRefundPercent(uint256 _refundPercent) external onlyOwner {
        refundPercent = _refundPercent;
    }
    
    function setRefundPeriod(uint256 _refundPeriod) external onlyOwner {
        refundPeriod = _refundPeriod;
    }
    
    function getContractBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }
    
    function withdrawFunds(uint256 _amount) external onlyOwner returns (bool) {
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success);
        return true;
    }
    
    function supplyFunds() external onlyOwner payable returns (bool) {
        (bool success, ) = address(this).call{value: msg.value}("");
        require(success);
        return true;
    }


    // Read functions.
    function getLatestPrice() public view returns (uint256) {
        (,int price,,,) = priceFeed.latestRoundData();
        return uint256((10**26)/price);
    }

    function getHotelStruct(uint256 _hotelId) public view returns (Hotel memory) {
        return hotelIdToHotel[_hotelId];
    }

    function getBookingStruct(uint256 _bookingId) public view returns (Booking memory) {
        return bookingIdToBooking[_bookingId];
    }

    function getVisitorBookings(address _visitor) public view returns (uint256[] memory) {
        return visitorToVisitorBookings[_visitor];
    }
     
    
    // Hotel functions.
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
    
    function getBookingCost(uint256 _hotelId, uint256 _rooms, uint256 _nights) public view returns (uint256) {
        uint256 bookingCost = hotelIdToHotel[_hotelId].pricePerNight * _nights * _rooms;
        return bookingCost;
    }
    
    
    // Visitor functions.
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
            
            // send non-refundable amount immediately to hotel owner.
            (bool success1, ) = payable(hotelIdToHotel[_hotelId].hotelOwner).call{value: (cost * getLatestPrice() * (100 - refundPercent))/100 }("");
            require(success1);
            
            // block maximum refund amount with smart contract.
            (bool success2, ) = address(this).call{value: (cost * getLatestPrice() * refundPercent)/100 }("");
            require(success2);

            visitorToVisitorBookings[msg.sender].push(bookingId);
            hotelIdToHotel[_hotelId].availableRooms -= _rooms;
            bookingIdToBooking[bookingId] = newBooking;
            
            emit Booked(bookingId, newBooking);
            return true;
    }
    
    function checkout(uint256 _bookingId) external isPlanned(_bookingId) isVisitor(_bookingId) returns (bool) {
        require(block.timestamp > bookingIdToBooking[_bookingId].fromTime);
        uint256 hId = bookingIdToBooking[_bookingId].hotelId;
        uint256 bCost = bookingIdToBooking[_bookingId].bookingCost;
        
        // send blocked amount to hotel owner.
        (bool success, ) = payable(hotelIdToHotel[hId].hotelOwner).call{value: (bCost * getLatestPrice() * refundPercent)/100 }("");
        require(success);

        bookingIdToBooking[_bookingId].status = State.Completed;
        
        emit Completed(_bookingId, block.timestamp);
        return true;
    }
    
    function cancelBooking(uint256 _bookingId) external isPlanned(_bookingId) isVisitor(_bookingId) returns (bool) {
        uint256 hId = bookingIdToBooking[_bookingId].hotelId;
        uint256 bCost = bookingIdToBooking[_bookingId].bookingCost;
        uint256 refundVisitor = getRefundAmount(_bookingId);
        
        if (refundVisitor > 0) {
            (bool success1, ) = payable(msg.sender).call{value: refundVisitor * getLatestPrice() }("");
            require(success1);
        }
        
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
    function getRefundAmount(uint256 _bookingId) internal view returns (uint256) {
        uint256 refundVisitor = 0;
        uint256 bCost = bookingIdToBooking[_bookingId].bookingCost;
        
        if (bookingIdToBooking[_bookingId].fromTime - block.timestamp >= 86400 * refundPeriod) {
            refundVisitor = (bCost * refundPercent)/100;
        }
        return refundVisitor;
    }
    
}