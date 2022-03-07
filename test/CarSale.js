const { expect, assert } = require("chai");
const { ethers, waffle } = require("hardhat");
const { deployContract, MockProvider } = waffle;
const provider = waffle.provider;

describe("Car Sale", function () {
  let CarSale;
  let hardhatCarSale;
  let owner;
  let buyer;
  let seller;

  beforeEach(async function () {
    CarSale = await ethers.getContractFactory("CarSale");
    [owner, buyer, seller] = await ethers.getSigners();
    hardhatCarSale = await CarSale.deploy();
    await hardhatCarSale.deployed();
  });

  it(`1. Customer cannot create order without name and address.`, async function () {
    // Expect createCarOrder to fail
    await expect(
      hardhatCarSale.connect(buyer).createCarOrder("", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    ).to.be.reverted;

    // Expect createCarOrder to fail
    await expect(
      hardhatCarSale.connect(buyer).createCarOrder("test", "", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    ).to.be.reverted;
  });

  it("2. Customer cannot confirm order unless order is valid.", async function () {
    const newContract = await hardhatCarSale
      .connect(buyer)
      .createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });

    // Expect confirmCarOrder to fail
    await expect(hardhatCarSale.confirmCarOrder({})).to.be.reverted;
  });

  it("3. Customer cannot be refunded if order was confirmed.", async function () {
    const newContract = await hardhatCarSale
      .connect(buyer)
      .createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });
    const confirmContract = await hardhatCarSale
      .connect(buyer)
      .confirmCarOrder({
        from: buyer.address,
      });

    // Expect cancelCarOrder to fail
    await expect(
      hardhatCarSale.connect(buyer).cancelCarOrder({ from: buyer.address })
    ).to.be.reverted;
  });

  it("4. Customer cannot place another order if a previous one has been entered.", async function () {
    const newContract = await hardhatCarSale
      .connect(buyer)
      .createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });

    // Expect createCarOrder to fail
    await expect(
      hardhatCarSale.connect(buyer).createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    ).to.be.reverted;
  });

  it("5. Customer must have the appropraite amount of funds to place order.", async function () {
    // Expect createCarOrder to fail
    await expect(
      hardhatCarSale.connect(buyer).createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("0.01"),
      })
    ).to.be.reverted;
  });

  it("6. Customer can successfully place order.", async function () {
    // Expect createCarOrder to succeed
    await assert.isOk(
      hardhatCarSale.connect(buyer).createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    );
  });

  it("7. Customer is refunded when the order is cancelled.", async function () {
    const newContract = await hardhatCarSale
      .connect(buyer)
      .createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });

    const newBalance = await buyer.getBalance();
    // console.log(newBalance);

    const contractCancelled = await hardhatCarSale
      .connect(buyer)
      .cancelCarOrder({
        from: buyer.address,
      });

    // console.log(await buyer.getBalance());

    // Expect passenger's balance has increased since the booking was cancelled
    expect(await buyer.getBalance()).to.be.above(newBalance);
  });

  it("8. Customer can confirm order.", async function () {
    // Expect createCarOrder to succeed
    await assert.isOk(
      hardhatCarSale.connect(buyer).createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      })
    );

    // Expect confirmCarOrder to succeed
    await assert.isOk(
      hardhatCarSale.connect(buyer).confirmCarOrder({
        from: buyer.address,
      })
    );
  });

  it("9. Smart contract should receive full funds from customer.", async function () {
    const newContract = hardhatCarSale
      .connect(buyer)
      .createCarOrder("test", "test", {
        from: buyer.address,
        value: ethers.utils.parseEther("10"),
      });
    const contractAddress = owner.address;

    // Expect contract to have at least 9 Ethers (can't be 10 due to gas fees)
    expect(await provider.getBalance(contractAddress)).to.be.least(9);
  });
});
