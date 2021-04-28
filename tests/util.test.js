const {getMockVehicleList, defaultVehiclesCounts, getMockOfferList,mockVehiclesCounts110, mockVehiclesCounts212} = require('./mock');

const {resetAllData, updateVehicleQuantity, getVehiclesCount, getFreeBikeCountOffer1, getFreeBikeCountOffer2 ,
	   getTotalPrice, getTotalPriceByVehicle} = require('../js/util');

let {vehicles, offerList, total_cart_quantity, total_offer_quantity, acceped_offer_id , rejected_offer_id ,
	discounts_for_rejects, deleted_free_bikes} = require('../js/util');

beforeAll(() => {
	return resetAllData;
});

beforeEach(() => {
	return resetAllData;
});

describe("util.js updateVehicleQuantity function tests",() => {

	test("test-1 : with negative quantity", ()=>{
		// arrange
		let mock_vehicles = getMockVehicleList();
		let copy = mock_vehicles.map(e => e);

		// act
		let quantity = -1;
		const vehicleId = 2;
		let state = updateVehicleQuantity(vehicleId, quantity, copy);

		// assert
		expect(state.length).toBe(mock_vehicles.length);
		mock_vehicles.forEach(el=>{
			expect(state).toContainEqual(el);
		});
	})

	test("test-2 : with empty list", ()=>{
		// arrange
		let mock_vehicles = [];
		let copy = mock_vehicles.map(e => e);

		// act
		let quantity = 2;
		const vehicleId = 2;
		let state = updateVehicleQuantity(vehicleId, quantity, copy);

		// assert
		expect(state.length).toBe(mock_vehicles.length);
		mock_vehicles.forEach(el=>{
			expect(state).toContainEqual(el);
		});
	})

	test("test-3 : with invalid id", ()=>{
		let mock_vehicles = getMockVehicleList();
		let copy = mock_vehicles.map(e => e);

		let quantity = 2;
		const vehicleId = -2;
		let state = updateVehicleQuantity(vehicleId, quantity, copy);

		expect(state.length).toBe(mock_vehicles.length);
		mock_vehicles.forEach(el=>{
			expect(state).toContainEqual(el);
		});
	})

	test("test-4 : with valid id and positive quantity", ()=>{
		let mock_vehicles = getMockVehicleList();
		let copy = mock_vehicles.map(e => e);

		let quantity = 2;
		const vehicleId = 2;
		let state = updateVehicleQuantity(vehicleId, quantity, copy);

		mock_vehicles[vehicleId - 1].quantity = quantity;
		expect(state.length).toBe(mock_vehicles.length);
		mock_vehicles.forEach(el=>{
			expect(state).toContainEqual(el);
		});
	})

	test("test-5 : with valid id and negative quantity", ()=>{
		let mock_vehicles = getMockVehicleList();
		mock_vehicles[0].quantity = 3;
		let copy = mock_vehicles.map(e => e);

		let quantity = -2;
		const vehicleId = 1;
		let state = updateVehicleQuantity(vehicleId, quantity, copy);

		mock_vehicles[vehicleId - 1].quantity = 1;
		expect(state.length).toBe(mock_vehicles.length);
		mock_vehicles.forEach(el=>{
			expect(state).toContainEqual(el);
		});
	})

});

describe("util.js getVehiclesCount function tests",() => {

	test("test-1 : with empty vehicle count list", ()=>{
		let mock_vehicles = [];
		let copy = mock_vehicles.map(e => e);

		let state = getVehiclesCount(copy);

		expect(state).toMatchObject({cars: 0, motorcycles: 0, bikes: 0});

	});

	test("test-2 : with null parameter", ()=>{
		let expected = Object.assign({}, defaultVehiclesCounts);

		let state = getVehiclesCount(null);

		expect(state).toMatchObject(expected);
	});

	test("test-3 : with mock_vehicles", ()=>{
		let mock_vehicles = getMockVehicleList();
		let copy = mock_vehicles.map(e => e);
		copy[0].quantity = 1;
		copy[1].quantity = 1;

		let expected = Object.assign({}, mockVehiclesCounts110);
		let state = getVehiclesCount(copy);

		expect(state).toMatchObject(expected);
	});

	test("test-4 : with mock_vehicles", ()=>{
		let mock_vehicles = getMockVehicleList();
		let copy = mock_vehicles.map(e => e);
		copy[2].quantity = 1;
		copy[1].quantity = 1;
		copy[2].quantity = 1;

		let expected = Object.assign({}, mockVehiclesCounts212);
		let state = getVehiclesCount(copy);

		expect(state).toMatchObject(expected);
	});
});

describe("util.js getFreeBikeCountOffer1 function tests",() => {

	test("test-1 : with null parameter", ()=>{
		let state = getFreeBikeCountOffer1(null);
		expect(state).toBe(0);
	});

	test("test-2 : with empty list", ()=>{
		let state = getFreeBikeCountOffer1({});
		expect(state).toBe(0);
	});

	test("test-3 : with 0 car, 0 motorcycle, 0 bike list", ()=>{
		let state = getFreeBikeCountOffer1({ cars: 0, motorcycles: 0, bikes: 0});
		expect(state).toBe(0);
	});

	test("test-4 : with 1 car, 1 motorcycle, 0 bike list", ()=>{
		let state = getFreeBikeCountOffer1({ cars: 1, motorcycles: 1, bikes: 1});
		expect(state).toBe(0);;
	});

	test("test-5 : with 2 cars, 1 motorcycle, 2 bikes list", ()=>{
		let state = getFreeBikeCountOffer1({ cars: 2, motorcycles: 1, bikes: 2});
		expect(state).toEqual(1);
	});

	test("test-6 : with 3 cars, 3 motorcycles, 3 bikes list", ()=>{
		let state = getFreeBikeCountOffer1({ cars: 3, motorcycles: 3, bikes: 3});
		expect(state).toEqual(2);
	});

	test("test-7 : function always must return a number which is greater or equal to Zero", ()=>{
		let state = getFreeBikeCountOffer1({ cars: Math.ceil(Math.random() * 100), 
											 motorcycles: Math.ceil(Math.random() * 100), 
											 bikes: Math.ceil(Math.random() * 100)});
		expect(state).toBeGreaterThanOrEqual(0);
	});
});

describe("util.js getFreeBikeCountOffer2 function tests",() => {

	test("test-1 : with null parameter", ()=>{
		let state = getFreeBikeCountOffer2(null);
		expect(state).toBe(0);
	});

	test("test-2 : with empty list", ()=>{
		let state = getFreeBikeCountOffer2({});
		expect(state).toBe(0);
	});

	test("test-3 : with 0 car, 0 motorcycle, 0 bike list", ()=>{
		let state = getFreeBikeCountOffer2({ cars: 0, motorcycles: 0, bikes: 0});
		expect(state).toBe(0);
	});

	test("test-4 : with 1 car, 1 motorcycle, 1 bike list", ()=>{
		let state = getFreeBikeCountOffer2({ cars: 1, motorcycles: 1, bikes: 1});
		expect(state).toBe(0);
	});

	test("test-5 : with 0 car, 1 motorcycle, 2 bikes list", ()=>{
		let state = getFreeBikeCountOffer2({ cars: 0, motorcycles: 1, bikes: 2});
		expect(state).toEqual(1);
	});

	test("test-6 : with 3 cars, 3 motorcycles, 4 bikes list", ()=>{
		let state = getFreeBikeCountOffer2({ cars: 3, motorcycles: 3, bikes: 4});
		expect(state).toEqual(1);
	});

	test("test-7 : function always must return 1 or 0", ()=>{
		let state = getFreeBikeCountOffer2({cars: Math.ceil(Math.random() * 100), 
											motorcycles: Math.ceil(Math.random() * 100), 
											bikes: Math.ceil(Math.random() * 100)});
		expect(state).toBeGreaterThanOrEqual(0);
		expect(state).not.toBeGreaterThan(1);
	});
});



describe("util.js getTotalPrice function tests", () => {

	test("test-1 : with null parametr", ()=>{
		let mock_vehicles = null
		expect(getTotalPrice(mock_vehicles)).toBe(0);
		expect(getTotalPrice(mock_vehicles)).toBeGreaterThanOrEqual(0);
	});

	test('test-2 : with empty list', () => {
		let mock_vehicles = []
		expect(getTotalPrice(mock_vehicles)).toBe(0);
		expect(getTotalPrice(mock_vehicles)).toBeGreaterThanOrEqual(0);
	});

	test('test-3 : with a default vehicle list', () => {
		let mock_vehicles = getMockVehicleList();
		let copy = mock_vehicles.map(e => e);

		let state = getTotalPrice(copy);

		expect(state).toEqual(0);
		expect(state).toBeGreaterThanOrEqual(0);
	});

	test('test-4 : with a non-default vehicle list', () => {
		let mock_vehicles = getMockVehicleList();
		let copy = mock_vehicles.map(e => e);
		copy[0].quantity = 1;
		copy[1].quantity = 1;
		copy[2].quantity = 2;

		let state = getTotalPrice(copy);

		expect(state).toEqual(650);
		expect(state).toBeGreaterThanOrEqual(0);
	});

	test('test-5 : with a non-default vehicle list', () => {
		let mock_vehicles = getMockVehicleList();
		let copy = mock_vehicles.map(e => e);
		copy[0].quantity = 2;
		copy[1].quantity = 4;
		copy[2].quantity = 5;

		let state = getTotalPrice(copy);

		expect(state).toEqual(1700);
		expect(state).toBeGreaterThanOrEqual(0);
	});
});

describe("util.js reset function tests",() => {

	test("test-1 : check necessary variables after resetAllData called", ()=>{

		let mock_vehicles = getMockVehicleList();
		let mock_offerList = getMockOfferList();

		let stage = resetAllData();

		expect(stage).toEqual(0);

		expect(total_cart_quantity).toEqual(0);
		expect(total_offer_quantity).toEqual(0);
		expect(acceped_offer_id).toEqual(-1);
		expect(rejected_offer_id).toEqual(-1);
		expect(discounts_for_rejects).toEqual(0);
		expect(deleted_free_bikes).toEqual(0);

		mock_vehicles.forEach((el) => {
			expect(vehicles).toContainEqual(el);
		});

		mock_offerList.forEach((el) => {
			expect(offerList).toContainEqual(el);
		});
	})
});

describe("util.js getTotalPriceByVehicle function tests", () => {

	test("test-1 : with null parametr", ()=>{
		let mock_vehicle = null
		expect(getTotalPriceByVehicle(mock_vehicle)).toEqual(0);
		expect(getTotalPriceByVehicle(mock_vehicle)).toBeGreaterThanOrEqual(0);
	});

	test('test-2 : with empty object', () => {
		let mock_vehicle = {}
		expect(getTotalPriceByVehicle(mock_vehicle)).toEqual(0);
		expect(getTotalPriceByVehicle(mock_vehicle)).toBeGreaterThanOrEqual(0);
	});

	test('test-3 : getTotalPriceByVehicle for Car', () => {
		let car = getMockVehicleList()[0];
		let copy = Object.assign({}, car);
		copy.quantity = 3;

		let state = getTotalPriceByVehicle(copy);

		expect(state).toEqual(900);
		expect(state).toBeGreaterThanOrEqual(0);
	});

	test('test-4 : getTotalPriceByVehicle for Motorcycle', () => {
		let motorcycle = getMockVehicleList()[1];
		let copy = Object.assign({}, motorcycle);
		copy.quantity = 2;

		let state = getTotalPriceByVehicle(copy);

		expect(state).toEqual(300);
		expect(state).toBeGreaterThanOrEqual(0);
	});

	test('test-5 : getTotalPriceByVehicle for Bike', () => {
		let bike = getMockVehicleList()[2];
		let copy = Object.assign({}, bike);
		copy.quantity = 4;

		let state = getTotalPriceByVehicle(copy);

		expect(state).toEqual(400);
		expect(state).toBeGreaterThanOrEqual(0);
	});
});

