const getMockVehicleList = () => [{
        id: 1,
        name: "Car",
        quantity: 0,
        price: 300,
        used: 0,
        is_deleted: false
    },
    {
        id: 2,
        name: "Motorcycle",
        quantity: 0,
        price: 150,
        used: 0,
        is_deleted: false
    },
    {
        id: 3,
        name: "Bike",
        quantity: 0,
        price: 100,
        used: 0,
        is_deleted: false
    },
    {
        id: 4,
        name: "Free Bike",
        quantity: 0,
        price: 0,
        used: 0,
        is_deleted: false
    }
];

const getMockOfferList = () => [{
    id: 1,
    accept_message: "",
    reject_message: "",
    quantity: 0,
    status: null
},
{
    id: 2,
    accept_message: "",
    reject_message: "",
    quantity: 0,
    status: null
}
];

const defaultVehiclesCounts = () => new { cars: 0, motorcycles: 0, bikes: 0};
const mockVehiclesCounts110 = () => new { cars: 1, motorcycles: 1, bikes: 0};
const mockVehiclesCounts212 = () => new { cars: 2, motorcycles: 1, bikes: 2};
const mockVehiclesCounts333 = () => new { cars: 3, motorcycles: 3, bikes: 3};


module.exports.getMockVehicleList = getMockVehicleList;
module.exports.getMockOfferList = getMockOfferList;
module.exports.defaultVehiclesCounts = defaultVehiclesCounts;
module.exports.mockVehiclesCounts110 = mockVehiclesCounts110;
module.exports.mockVehiclesCounts212 = mockVehiclesCounts212;
module.exports.mockVehiclesCounts333 = mockVehiclesCounts333;