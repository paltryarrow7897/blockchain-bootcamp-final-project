# blockchain-bootcamp-final-project

Commissionless Hotel Listing and Booking Dapp.

Idea:
Hotels could be the listed on the dapp for some fee.
Visitors could book rooms on any listed hotels and pay directly and avoid any third party charges.

Known Limitations:
Only one type of room could be listed at the moment. Number of rooms is not limited.
Visitors hvea to execute a transaction to mark their trip completed.

Practical Limitation:
No knowledge if the registering hotel is real or scam. One solution is to let people vote and display voted hotels at the top of the page.

Working Functions:
Register Hotel: anyone with an ethereum wallet could list their hotels on the dapp. Registration fee is owner defined. 
Book Hotel: visitors choose their preferred hotels, enter number of rooms and nights for their stay and pay. 
Cancel Booking: refunds may be applicable if visitors cancel their booking in a certain period.

To-Do:
Chainlink Price Feed to get prices in USD or any other currency.
Chainlink Keepers to make hotel registration as quarterly renewal service instead of a one time payment.
Chainlink Keepers to automatically mark trip as completed after the booking duration ends.
Compound or any other DeFi integration to provide and earn interests on taken registration fes.
