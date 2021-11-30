const finalProjectContractAddress = '0x92760b10251e90f9dFcc3877117cEc615345990C'
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
      if (window.ethereum.isMetaMask === true) {
        let mmDetected = document.getElementById('mm-detected');
        var web3 = new Web3(window.ethereum);
        let textNode = document.createTextNode("Connect to Kovan Testnet to continue. ")
        mmDetected.insertBefore(textNode, mmDetected.childNodes[0]);
        $("#mm-connect").show();
      } else {
        let mmDetected = document.getElementById('mm-detected')
        let anchor = document.createElement("a");
        let anchorText = document.createTextNode(" https://metamask.io/ ");
        anchor.appendChild(anchorText);
        anchor.setAttribute("href", "https://metamask.io/");
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
        textNode = document.createTextNode("You need MetaMask to continue. Download here: ");
        mmDetected.appendChild(textNode);
        mmDetected.appendChild(anchor);
        $("#hotelRegistrationDiv").hide();
        $("#getLatestPriceDiv").hide();
        $("#bookHotelDiv").hide();
        $("#userBookingsDiv").hide();
        $("#seeAllHotelsDiv").hide(); 
      }
    } else {
      let mmDetected = document.getElementById('mm-detected')
      let anchor = document.createElement("a");
      let anchorText = document.createTextNode(" https://metamask.io/ ");
      anchor.appendChild(anchorText);
      anchor.setAttribute("href", "https://metamask.io/");
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
      textNode = document.createTextNode("You need MetaMask to continue. Download here: ");
      mmDetected.appendChild(textNode);
      mmDetected.appendChild(anchor);
      $("#hotelRegistrationDiv").hide();
      $("#getLatestPriceDiv").hide();
      $("#bookHotelDiv").hide();
      $("#userBookingsDiv").hide();
      $("#seeAllHotelsDiv").hide();
    }
  });

var web3 = new Web3(window.ethereum)

const mmEnable = document.getElementById('mm-connect');
 
mmEnable.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts'})
  var mmCurrentAccount = document.getElementById('mm-current-account');
  let currentAccount = ethereum.selectedAddress.substr(0,5) + "..." + ethereum.selectedAddress.substr(-4);
  mmCurrentAccount.innerHTML = 'Current Account: ' + currentAccount;
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

  const transactionStatus = document.getElementById("transactionStatus");
  transactionStatus.innerHTML = "Processing...";

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
    })
    .on('confirmation', function(confirmationNumber, receipt) {
      transactionStatus.innerHTML = "Confirmed! you can now close this form.";
      $("#registerHotelForm")[0].reset();
    })
    .on('error', function(error, receipt) {
      transactionStatus.innerHTML = "Something happened, got this error: " + error.code + ":" + error.message;
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
      hotelDiv.classList.add("bordered");
      hotelDiv.classList.add("left");
			hotelsPlaceholderDiv.appendChild(hotelDiv);

			let hotelIdDiv = document.createElement("div");
			let hotelNameDiv = document.createElement("div");
			let hotelAddressDiv = document.createElement("div");
			let hotelAvailableRoomsDiv = document.createElement("div");
			let hotelPricePerNightDiv = document.createElement("div");
			let hotelImageUrlDiv = document.createElement("div");
			hotelImageUrlDiv.classList.add("imageContainer");
/*
      let bookHotelButton = document.createElement("button");
      bookHotelButton.classList.add("imageButton");
      bookHotelButton.id = "bookButton" + i;
      hotelImageUrlDiv.appendChild(bookHotelButton);
      let bookHotelButtonText = document.createTextNode("Book This Hotel");
      bookHotelButton.appendChild(bookHotelButtonText);
*/
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

  const bookingTransactionStatus = document.getElementById("bookingTransactionStatus");
  bookingTransactionStatus.innerHTML = "Processing...";

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
	})
  .on('confirmation', function(confirmationNumber, receipt) {
    bookingTransactionStatus.innerHTML = "Confirmed! you can now close this form.";
    $("#bookHotelForm")[0].reset();
  })
  .on('error', function(error, receipt) {
    bookingTransactionStatus.innerHTML = "Something happened, got this error: " + error.code + ":" + error.message;
  });
}

const userBookings = document.getElementById("userBookings");
userBookings.onclick = async () => {
  $("#userBookings").hide();

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
      bookingDiv.classList.add("bordered");
      bookingDiv.classList.add("left");

			let bookingIdDiv = document.createElement("div");
			let hotelIdDiv = document.createElement("div");
			let fromDateDiv = document.createElement("div");
			let statusDiv = document.createElement("div");
/*
      let checkoutButton = document.createElement("button");
      let checkoutButtonText = document.createTextNode("Checkout");
      checkoutButton.classList.add("checkoutButtons");
      checkoutButton.appendChild(checkoutButtonText);
      checkoutButton.id = "checkoutButton" + (numberOfBookings[i]);

      let cancelButton = document.createElement("button");
      let cancelButtonText = document.createTextNode("Cancel");
      cancelButton.classList.add("cancelButtons");
      cancelButton.appendChild(cancelButtonText);
      cancelButton.id = "cancelButton" + (numberOfBookings[i]);
*/
			bookingDiv.appendChild(bookingIdDiv);
			bookingDiv.appendChild(hotelIdDiv);
			bookingDiv.appendChild(fromDateDiv);
			bookingDiv.appendChild(statusDiv);
/*
      bookingDiv.appendChild(checkoutButton);
      bookingDiv.appendChild(cancelButton);
*/
			let bookingArray = await projectContract.methods.getBookingStruct(parseInt(numberOfBookings[i])).call();
			bookingId = document.createTextNode("Booking ID: " + parseInt(numberOfBookings[i]));
			hotelId = document.createTextNode("Hotel ID: " + bookingArray[1]);

      let varDate = new Date(bookingArray[4] * 1000);
			fromDate = document.createTextNode("From Date: " + varDate.toDateString());

      if (bookingArray[7] == 0) {
        bookingStatus = document.createTextNode("Status: Planned");
      } else if (bookingArray[7] == 1) {
        bookingStatus = document.createTextNode("Status: Completed");
//        $("#checkoutButton"+(numberOfBookings[i])).hide();
//        $("#cancelButton"+(numberOfBookings[i])).hide();
      } else {
        bookingStatus = document.createTextNode("Status: Cancelled");
//        $("#checkoutButton"+(i+1)).hide();
//        $("#cancelButton"+(i+1)).hide();
      }

			bookingIdDiv.appendChild(bookingId);
			hotelIdDiv.appendChild(hotelId);
			fromDateDiv.appendChild(fromDate);
			statusDiv.appendChild(bookingStatus);
		}
	}
}
/*
const checkoutBooking = document.getElementsByClassName("checkoutButtons");
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

  let buttonId = checkoutBooking.id;
  let id = buttonId.substr(14);
  let bookingId = parseInt(id);
  await projectContract.methods.checkout(bookingId).send({
    from: ethereum.selectedAddress
  });
}

const cancelBooking = document.getElementsByClassName("cancelButtons");
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

  let buttonId = cancelBooking.id;
  let id = buttonId.substr(12);
  let bookingId = parseInt(id);
  await projectContract.methods.cancelBooking(bookingId).send({
    from: ethereum.selectedAddress
  });
}
*/

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
