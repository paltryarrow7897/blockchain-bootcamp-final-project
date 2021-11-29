const finalProjectContractAddress = '0x5288a79a79214fCc88F15e0E480010067643e6b9'
const finalProjectContractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_registerFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_refundPercent",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_refundPeriod",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bookingId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "visitor",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "hotelId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rooms",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bookingTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "fromTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "toTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bookingCost",
              "type": "uint256"
            },
            {
              "internalType": "enum finalProjectContractV2.State",
              "name": "status",
              "type": "uint8"
            }
          ],
          "indexed": false,
          "internalType": "struct finalProjectContractV2.Booking",
          "name": "newBooking",
          "type": "tuple"
        }
      ],
      "name": "Booked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bookingId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "refundVisitor",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "Cancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bookingId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "Completed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "hotelId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "hotelOwner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "hotelName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "hotelAddress",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "totalRooms",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "availableRooms",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pricePerNight",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "registered",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "imgUrl",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct finalProjectContractV2.Hotel",
          "name": "newHotel",
          "type": "tuple"
        }
      ],
      "name": "HotelRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "bookingId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "hotelId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "refundPercent",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "refundPeriod",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "registerFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_registerFee",
          "type": "uint256"
        }
      ],
      "name": "setRegisterFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_refundPercent",
          "type": "uint256"
        }
      ],
      "name": "setRefundPercent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_refundPeriod",
          "type": "uint256"
        }
      ],
      "name": "setRefundPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getContractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawFunds",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "supplyFunds",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "getLatestPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_hotelId",
          "type": "uint256"
        }
      ],
      "name": "getHotelStruct",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "hotelOwner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "hotelName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "hotelAddress",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "totalRooms",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "availableRooms",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pricePerNight",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "registered",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "imgUrl",
              "type": "string"
            }
          ],
          "internalType": "struct finalProjectContractV2.Hotel",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_bookingId",
          "type": "uint256"
        }
      ],
      "name": "getBookingStruct",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "visitor",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "hotelId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rooms",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bookingTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "fromTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "toTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bookingCost",
              "type": "uint256"
            },
            {
              "internalType": "enum finalProjectContractV2.State",
              "name": "status",
              "type": "uint8"
            }
          ],
          "internalType": "struct finalProjectContractV2.Booking",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_visitor",
          "type": "address"
        }
      ],
      "name": "getVisitorBookings",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_totalRooms",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_pricePerNight",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_imgUrl",
          "type": "string"
        }
      ],
      "name": "registerHotel",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_hotelId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_rooms",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_nights",
          "type": "uint256"
        }
      ],
      "name": "getBookingCost",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_hotelId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_rooms",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fromTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_toTime",
          "type": "uint256"
        }
      ],
      "name": "bookHotel",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_bookingId",
          "type": "uint256"
        }
      ],
      "name": "checkout",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_bookingId",
          "type": "uint256"
        }
      ],
      "name": "cancelBooking",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

window.addEventListener('load', function() {
  
    if (typeof window.ethereum !== 'undefined') {
      console.log('window.ethereum is enabled')
      if (window.ethereum.isMetaMask === true) {
        console.log('MetaMask is active')
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML += 'MetaMask Is Available!'
  
        var web3 = new Web3(window.ethereum)
  
      } else {
        console.log('MetaMask is not available')
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML += 'MetaMask Not Available!'
      }
    } else {
      console.log('window.ethereum is not found')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
    }
  })

var web3 = new Web3(window.ethereum)

const mmEnable = document.getElementById('mm-connect');
 
mmEnable.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts'})
  console.log(ethereum.selectedAddress);
  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
}

const usdToWeiButton = document.getElementById('getLatestPrice');
usdToWeiButton.onclick = async () => {
  var web3 = new Web3(window.ethereum);

  const projectContract = new web3.eth.Contract(finalProjectContractABI, finalProjectContractAddress);
  projectContract.setProvider(window.ethereum);
  projectContract.defaultChain = 'kovan';

  const latestPrice = document.getElementById('latestPrice');
  let value = parseInt(await projectContract.methods.getLatestPrice().call());
  latestPrice.innerHTML = (value/10**18).toPrecision(8);
}

const regHotel = document.getElementById('submitRegisterHotel');
regHotel.onclick = async () => {
  var web3 = new Web3(window.ethereum);

  let hotelId, hotelArray;
  const hotelName = document.getElementById('hotelName').value;
  const hotelAddress = document.getElementById('hotelAddress').value;
  const hotelTotalRooms = document.getElementById('hotelTotalRooms').value;
  const hotelPricePerNight = document.getElementById('hotelPricePerNight').value;
  const hotelImgUrl = document.getElementById('hotelImgUrl').value;

  const projectContract = new web3.eth.Contract(finalProjectContractABI, finalProjectContractAddress);
  projectContract.setProvider(window.ethereum);
  projectContract.defaultChain = 'kovan';

  let registerFee = parseInt(await projectContract.methods.registerFee().call());
  let usdToWei = parseInt(await projectContract.methods.getLatestPrice().call());

  projectContract.once("HotelRegistered", (error, event) => {
    if (!error) {
		console.log(event);
		hotelId = event.returnValues.hotelId;
		hotelArray = event.returnValues.newHotel;
	}
  });

  await projectContract.methods.registerHotel( 
    hotelName, 
    hotelAddress, 
    hotelTotalRooms,  
    hotelPricePerNight, 
    hotelImgUrl).send({
      from: ethereum.selectedAddress, 
      value: registerFee * usdToWei
    });

}

const seeAllHotelsButton = document.getElementById("seeAllHotels");
seeAllHotelsButton.onclick = async () => {
	var web3 = new Web3(window.ethereum);

	const projectContract = new web3.eth.Contract(finalProjectContractABI, finalProjectContractAddress);
	projectContract.setProvider(window.ethereum);
	projectContract.defaultChain = 'kovan';

	let hotelsPlaceholderDiv = document.getElementById("hotelsPlaceholderDiv");
	let numberOfHotels = parseInt(await projectContract.methods.hotelId().call());
	let hotelId, hotelName, hotelAddress, hotelAvailableRooms, hotelPricePerNight, hotelImageUrl;

	if (numberOfHotels == 0) {
		let noHotelsTextNode = document.createTextNode("No Hotels To Show So Far.");
		hotelsPlaceholderDiv.appendChild(noHotelsTextNode);
	} else {
		for(let i=1; i<=numberOfHotels; i++) {
			let hotelDiv = document.createElement("div");
			hotelsPlaceholderDiv.appendChild(hotelDiv);

			let hotelIdDiv = document.createElement("div");
			let hotelNameDiv = document.createElement("div");
			let hotelAddressDiv = document.createElement("div");
			let hotelAvailableRoomsDiv = document.createElement("div");
			let hotelPricePerNightDiv = document.createElement("div");
			let hotelImageUrlDiv = document.createElement("div");
			hotelImageUrlDiv.classList.add("imageContainer");

			hotelDiv.appendChild(hotelImageUrlDiv);
			hotelDiv.appendChild(hotelIdDiv);
			hotelDiv.appendChild(hotelNameDiv);
			hotelDiv.appendChild(hotelAddressDiv);
			hotelDiv.appendChild(hotelAvailableRoomsDiv);
			hotelDiv.appendChild(hotelPricePerNightDiv);

			let hotelArray = await projectContract.methods.getHotelStruct(i).call();
			hotelId = document.createTextNode("Hotel ID: " + i);
			hotelName = document.createTextNode("Hotel Name: " + hotelArray[1]);
			hotelAddress = document.createTextNode("Hotel Address: " + hotelArray[2]);
			hotelAvailableRooms = document.createTextNode("Available Rooms: " + hotelArray[4]);
			hotelPricePerNight = document.createTextNode("Price Per Night (USD): " + hotelArray[5]);
			hotelImageUrl = document.createElement("img");
			hotelImageUrl.src = hotelArray[7];

			hotelIdDiv.appendChild(hotelId);
			hotelNameDiv.appendChild(hotelName);
			hotelAddressDiv.appendChild(hotelAddress);
			hotelAvailableRoomsDiv.appendChild(hotelAvailableRooms);
			hotelPricePerNightDiv.appendChild(hotelPricePerNight);
			hotelImageUrlDiv.appendChild(hotelImageUrl);
		}
	}

}

const bookHotel = document.getElementById("submitBookHotel");
bookHotel.onclick = async () => {
	var web3 = new Web3(window.ethereum);

	const projectContract = new web3.eth.Contract(finalProjectContractABI, finalProjectContractAddress);
	projectContract.setProvider(window.ethereum);
	projectContract.defaultChain = 'kovan';

	let bookingId, bookingArray;
	let hotelId = document.getElementById("bookHotelId").value;
	let rooms = document.getElementById("bookRooms").value;
	let fromDate = parseInt(document.getElementById("epochFromDate").value)/1000;
	let toDate = parseInt(document.getElementById("epochToDate").value)/1000;
	let nights = Math.floor((toDate + 86399 - fromDate)/86400);

	let bookingCost = parseInt(await projectContract.methods.getBookingCost(hotelId, rooms, nights).call());
	let usdToWei = parseInt(await projectContract.methods.getLatestPrice().call());

	projectContract.once("Booked", (error, event) => {
		if (!error) {
			console.log(event);
			bookingId = event.returnValues.bookingId;
			bookingArray = event.returnValues.newBooking;
		}
	});

	await projectContract.methods.bookHotel(
		hotelId,
		rooms,
		fromDate,
		toDate
	).send({
		from: ethereum.selectedAddress,
		value: bookingCost * usdToWei
	});
}

const userBookings = document.getElementById("userBookings");
userBookings.onclick = async () => {
	var web3 = new Web3(window.ethereum);

	const projectContract = new web3.eth.Contract(finalProjectContractABI, finalProjectContractAddress);
	projectContract.setProvider(window.ethereum);
	projectContract.defaultChain = 'kovan';

	let userBookingsPlaceholderDiv = document.getElementById("userBookingsPlaceholderDiv");
	let numberOfBookings = await projectContract.methods.getVisitorBookings(ethereum.selectedAddress).call();

	if (numberOfBookings.length == 0) {
		let noBookingsTextNode = document.createTextNode("No Bookings To Show So Far.");
		userBookingsPlaceholderDiv.appendChild(noBookingsTextNode);
	} else {
		for(let i=0; i<numberOfBookings.length; i++) {
			let bookingDiv = document.createElement("div");
			userBookingsPlaceholderDiv.appendChild(bookingDiv);

			let bookingIdDiv = document.createElement("div");
			let hotelIdDiv = document.createElement("div");
			let fromDateDiv = document.createElement("div");
			let statusDiv = document.createElement("div");

			bookingDiv.appendChild(bookingIdDiv);
			bookingDiv.appendChild(hotelIdDiv);
			bookingDiv.appendChild(fromDateDiv);
			bookingDiv.appendChild(statusDiv);

			let bookingArray = await projectContract.methods.getBookingStruct(parseInt(numberOfBookings[i])).call();
			bookingId = document.createTextNode("Booking ID: " + parseInt(numberOfBookings[i]));
			hotelId = document.createTextNode("Hotel ID: " + bookingArray[1]);
			fromDate = document.createTextNode("From Date: " + bookingArray[4]);
			bookingStatus = document.createTextNode("Status: " + bookingArray[7]);

			bookingIdDiv.appendChild(bookingId);
			hotelIdDiv.appendChild(hotelId);
			fromDateDiv.appendChild(fromDate);
			statusDiv.appendChild(bookingStatus);
		}
	}
}

const checkoutBooking = document.getElementById("submitCheckout");
checkoutBooking.onclick = async () => {
	var web3 = new Web3(window.ethereum);

	const projectContract = new web3.eth.Contract(finalProjectContractABI, finalProjectContractAddress);
	projectContract.setProvider(window.ethereum);
	projectContract.defaultChain = 'kovan';

	let completedBookingId, completedBookingTimestamp;
	projectContract.once("Completed", (error, event) => {
		if (!error) {
			console.log(event);
			completedBookingId = event.returnValues.bookingId;
			completedBookingTimestamp = event.returnValues.timestamp;
		}
	});

	let bookingId = document.getElementById("checkoutBooking").value;
	await projectContract.methods.checkout(bookingId).send({
		from: ethereum.selectedAddress
	});
}

const cancelBooking = document.getElementById("submitCancelBooking");
cancelBooking.onclick = async () => {
	var web3 = new Web3(window.ethereum);

	const projectContract = new web3.eth.Contract(finalProjectContractABI, finalProjectContractAddress);
	projectContract.setProvider(window.ethereum);
	projectContract.defaultChain = 'kovan';

	let cancelledBookingId, refundVisitor, cancelledBookingTimestamp;
	projectContract.once("Cancelled", (error, event) => {
		if (!error) {
			console.log(event);
			cancelledBookingId = event.returnValues.bookingId;
			refundVisitor = event.returnValues.refundVisitor;
			cancelledBookingTimestamp = event.returnValues.timestamp;
		}
	});

	let bookingId = document.getElementById("cancelBookingId").value;
	await projectContract.methods.cancelBooking(bookingId).send({
		from: ethereum.selectedAddress
	});
}