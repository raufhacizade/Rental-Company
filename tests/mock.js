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

module.exports = getMockVehicleList;
module.exports = getMockOfferList;