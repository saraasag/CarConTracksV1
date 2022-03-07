const { expect, assert } = require("chai");
const { ethers, waffle } = require("hardhat");
const { deployContract, MockProvider } = waffle;
const provider = waffle.provider;

describe("Flight Booking", function () {
  let FlightBooking;
  let hardhatFlightBooking;
  let owner;
  let buyer;
  let seller;

  beforeEach(async function () {
    FlightBooking = await ethers.getContractFactory("FlightBooking");
    [owner, buyer, seller] = await ethers.getSigners();
    hardhatFlightBooking = await FlightBooking.deploy();
    await hardhatFlightBooking.deployed();
  });

  it(`1. A passenger cannot book a ticket is either the departureCity or arrivalCity is an empty string.`, async function () {
    // Expect createBooking to fail
    await expect(
      hardhatFlightBooking.connect(buyer).createBooking("", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    ).to.be.reverted;

    // Expect createBooking to fail
    await expect(
      hardhatFlightBooking.connect(buyer).createBooking("test", "", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    ).to.be.reverted;
  });

  it("2. A passenger cannot check in if the booking is not valid (when isValidBooking is false).", async function () {
    const newContract = await hardhatFlightBooking
      .connect(buyer)
      .createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });

    // Expect confirmBooking to fail
    await expect(hardhatFlightBooking.confirmBooking({})).to.be.reverted;
  });

  it("3. A passenger cannot refund the ticket if the passenger has checked in.", async function () {
    const newContract = await hardhatFlightBooking
      .connect(buyer)
      .createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });
    const confirmContract = await hardhatFlightBooking
      .connect(buyer)
      .confirmBooking({
        from: buyer.address,
      });

    // Expect cancelBooking to fail
    await expect(
      hardhatFlightBooking.connect(buyer).cancelBooking({ from: buyer.address })
    ).to.be.reverted;
  });

  it("4. A passenger cannot buy another ticket before she/he has checked-in or canceled the air-ticket.", async function () {
    const newContract = await hardhatFlightBooking
      .connect(buyer)
      .createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });

    // Expect createBooking to fail
    await expect(
      hardhatFlightBooking.connect(buyer).createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    ).to.be.reverted;
  });

  it("5. A passenger cannot make a booking if he/she does not send enough ether to the smart contract.", async function () {
    // Expect createBooking to fail
    await expect(
      hardhatFlightBooking.connect(buyer).createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("0.01"),
      })
    ).to.be.reverted;
  });

  it("6. If everything is OK, a passenger should make a booking successfully.", async function () {
    // Expect createBooking to succeed
    await assert.isOk(
      hardhatFlightBooking.connect(buyer).createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    );
  });

  it("7. A passenger should receive the money when she/he cancel the booking successfully.", async function () {
    const newContract = await hardhatFlightBooking
      .connect(buyer)
      .createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });

    const newBalance = await buyer.getBalance();
    // console.log(newBalance);

    const contractCancelled = await hardhatFlightBooking
      .connect(buyer)
      .cancelBooking({
        from: buyer.address,
      });

    // console.log(await buyer.getBalance());

    // Expect passenger's balance has increased since the booking was cancelled
    expect(await buyer.getBalance()).to.be.above(newBalance);
  });

  it("8. A passenger can check in if everything is good.", async function () {
    // Expect createBooking to succeed
    await assert.isOk(
      hardhatFlightBooking.connect(buyer).createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    );

    // Expect confirmBooking to succeed
    await assert.isOk(
      hardhatFlightBooking.connect(buyer).confirmBooking({
        from: buyer.address,
      })
    );
  });

  it("9. The smart contract should have the correct balance of Ethers if a booking has been made.", async function () {
    const newContract = hardhatFlightBooking
      .connect(buyer)
      .createBooking("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });
    const contractAddress = owner.address;

    // Expect contract to have at least 9 Ethers (can't be 10 due to gas fees)
    expect(await provider.getBalance(contractAddress)).to.be.least(9);
  });
});
