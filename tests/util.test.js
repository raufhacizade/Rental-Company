const getMockVehicleList = require('./mock');
const getMockOfferList = require('./mock');

const resetAllData = require('../js/util');
const updateVehicleQuantity = require('../js/util');
const getVehiclesCount = require('../js/util');
const getFreeBikeCountOffer1 = require('../js/util');
const getFreeBikeCountOffer2 = require('../js/util');
const getTotalPrice = require('../js/util');
const getTotalPriceByVehicle = require('../js/util');

test("updateVehicleQuantity with negative number and 0 quantity", () => {
	let mock_vehicles = getMockVehicleList();
	expect(updateVehicleQuantity(2, -2, mock_vehicles)).toBe(mock_vehicles);
});

test("updateVehicleQuantity with negative number and 3 quantity", () => {
	mock_vehicles = getMockVehicleList()
	mock_vehicles[1].quantity = 1;
	expect(updateVehicleQuantity(2, -2, mock_vehicles)).toBe(mock_vehicles)
});

test("updateVehicleQuantity with invalid id", () => {
	mock_vehicles = getMockVehicleList();
	expect(updateVehicleQuantity(-2, 2, mock_vehicles)).toBe(mock_vehicles);
});

test("updateVehicleQuantity with empty vehicle list", () => {
	expect(updateVehicleQuantity(2, -2, [])).not.toBe([])
	expect(updateVehicleQuantity(2, -2, [])).toStrictEqual([])
});

test("updateVehicleQuantity with valid id and positive number", () => {
	mock_vehicles = getMockVehicleList()
	mock_vehicles[0].quantity = 1;
	expect(updateVehicleQuantity(1, 1, mock_vehicles)).toBe(mock_vehicles)
});

beforeAll(() => {
	return resetAllData;
});

beforeEach(() => {
	return resetAllData;
});


test("getVehiclesCount with empty vehicle list", () => {
	let expected_result = {
		cars: 0,
		motorcycles: 0,
		bikes: 0
	}
	expect(getVehiclesCount([])).not.toBe(expected_result)
	expect(getVehiclesCount([])).toStrictEqual(expected_result)
});

test("updateVehicleQuantity with mock_vehicles", () => {
	let mock_vehicles = getMockVehicleList()
	mock_vehicles[0].quantity = 1;
	mock_vehicles[1].quantity = 1;
	let expected_result = {
		cars: 1,
		motorcycles: 1,
		bikes: 0
	}
	expect(getVehiclesCount(mock_vehicles)).not.toBe(expected_result)
	expect(getVehiclesCount(mock_vehicles)).toStrictEqual(expected_result)
});

describe('getFreeBikeCountOffer1 all tests', () => {

	describe('getFreeBikeCountOffer1 with empty list', () => {
		// console.log('getFreeBikeCountOffer1 with empty list');
		test('test 1', () => {
			let mock_vehicles_count = []
			expect(getFreeBikeCountOffer1(mock_vehicles_count)).toBe(0);
			expect(getFreeBikeCountOffer1(mock_vehicles_count)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getFreeBikeCountOffer1 with all zero list', () => {
		// console.log('getFreeBikeCountOffer1 with all zero list');
		test('test 2', () => {
			let mock_vehicles_count = {
				cars: 0,
				motorcycles: 0,
				bikes: 0
			}
			expect(getFreeBikeCountOffer1(mock_vehicles_count)).toBe(0);
			expect(getFreeBikeCountOffer1(mock_vehicles_count)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getFreeBikeCountOffer1 with 3 cars, 2 motorcycles, 2 bikes', () => {
		// console.log('getFreeBikeCountOffer1 with 3 cars, 2 motorcycles, 2 bikes');
		test('test 3', () => {
			let mock_vehicles_count = {
				cars: 3,
				motorcycles: 2,
				bikes: 2
			}
			expect(getFreeBikeCountOffer1(mock_vehicles_count)).toBe(1);
			expect(getFreeBikeCountOffer1(mock_vehicles_count)).toBeGreaterThanOrEqual(0);
		});
	});
});

describe('getFreeBikeCountOffer2 tests', () => {

	describe('getFreeBikeCountOffer2 with empty list', () => {
		test('test 1', () => {
			let mock_vehicles_count = []
			expect(getFreeBikeCountOffer2(mock_vehicles_count)).toBe(0);
			expect(getFreeBikeCountOffer2(mock_vehicles_count)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getFreeBikeCountOffer2 with all zero list', () => {
		test('test 2', () => {
			let mock_vehicles_count = {
				cars: 0,
				motorcycles: 0,
				bikes: 0
			}
			expect(getFreeBikeCountOffer2(mock_vehicles_count)).toBe(0);
			expect(getFreeBikeCountOffer2(mock_vehicles_count)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getFreeBikeCountOffer2 with 3 cars, 2 motorcycles, 2 bikes', () => {
		test('test 3', () => {
			let mock_vehicles_count = {
				cars: 3,
				motorcycles: 2,
				bikes: 2
			}
			expect(getFreeBikeCountOffer2(mock_vehicles_count)).toBe(1);
			expect(getFreeBikeCountOffer2(mock_vehicles_count)).toBeGreaterThanOrEqual(0);
		});
	});
});

describe('getTotalPrice tests', () => {

	describe('getTotalPrice with null parametr', () => {
		test('test 1', () => {
			let mock_vehicles = null
			expect(getTotalPrice(mock_vehicles)).toBe(0);
			expect(getTotalPrice(mock_vehicles)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getTotalPrice with empty list', () => {
		test('test 2', () => {
			let mock_vehicles = []
			expect(getTotalPrice(mock_vehicles)).toBe(0);
			expect(getTotalPrice(mock_vehicles)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getTotalPrice with all quantities zero list', () => {
		test('test 3', () => {
			let mock_vehicles = getMockVehicleList();
			expect(getTotalPrice(mock_vehicles)).toBe(0);
			expect(getTotalPrice(mock_vehicles)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getTotalPrice with valid list', () => {
		test('test 4', () => {
			let mock_vehicles = getMockVehicleList()
			mock_vehicles[0].quantity = 1;
			mock_vehicles[1].quantity = 1;
			mock_vehicles[2].quantity = 2;
			expect(getTotalPrice(mock_vehicles)).toBe(550);
			expect(getTotalPrice(mock_vehicles)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getTotalPrice with valid list', () => {
		test('test 5', () => {
			let mock_vehicles = getMockVehicleList()
			mock_vehicles[0].quantity = 2;
			mock_vehicles[1].quantity = 4;
			mock_vehicles[2].quantity = 5;
			expect(getTotalPrice(mock_vehicles)).toBe(1700);
			expect(getTotalPrice(mock_vehicles)).toBeGreaterThanOrEqual(0);
		});
	});

});

describe('getTotalPriceByVehicle tests', () => {

	describe('getTotalPriceByVehicle with null parametr', () => {
		test('test 1', () => {
			let mock_vehicle = null
			expect(getTotalPriceByVehicle(mock_vehicle)).toBe(0);
			expect(getTotalPriceByVehicle(mock_vehicle)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getTotalPriceByVehicle with valid vehicle', () => {
		test('test 2', () => {
			let mock_vehicle = getMockVehicleList()[1];
			expect(getTotalPriceByVehicle(mock_vehicle)).toBe(0);
			expect(getTotalPriceByVehicle(mock_vehicle)).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getTotalPriceByVehicle for Motorcycle', () => {
		test('test 3', () => {
			let mock_vehicle = getMockVehicleList()[1];
			mock_vehicle.quantity = 3;
			expect(getTotalPriceByVehicle(mock_vehicle)).toBe(450);
			expect(getTotalPriceByVehicle(mock_vehicle)).toBeGreaterThanOrEqual(0);
		});
	});
});