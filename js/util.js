
let vehicles = [{
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

let offerList = [{
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

let total_cart_quantity = 0;
let total_offer_quantity = 0;
let acceped_offer_id = -1;
let rejected_offer_id = -1;
let discounts_for_rejects = 0;
let deleted_free_bikes = 0;

function updateVehicleQuantity(v_id, number, vehiclesList){
    let selectedVehicle = null;

    if(vehiclesList){
         selectedVehicle = vehiclesList.find(vehicle => vehicle.id == v_id);
    }

    if(selectedVehicle && !(number < 0 && selectedVehicle.quantity <= 0)){
        selectedVehicle.quantity += number;
        total_cart_quantity += number;
    }

    return vehiclesList;
}

function getVehiclesCount(vehiclesList) {
    let result = {cars: 0, motorcycles: 0, bikes: 0}

    if(vehiclesList !=null){
        for (let i = 0; i < vehiclesList.length; i++) {
            let vehicle = vehiclesList[i];
          
            if (vehicle.id == 1) result.cars += vehicle.quantity;
            else if (vehicle.id == 2) result.motorcycles += vehicle.quantity;
            else if (vehicle.id == 3) result.bikes += vehicle.quantity;
        }
    }

    return result;
}

function getFreeBikeCountOffer1(vehicles_count){
    let offerCount = 0;
    if (vehicles_count.motorcycles / 2 >= vehicles_count.cars)
        offerCount = vehicles_count.cars;
    else
        offerCount += Math.floor(vehicles_count.motorcycles / 2) +
        Math.floor((vehicles_count.cars - Math.floor(vehicles_count.motorcycles / 2)) / 2)

    return offerCount;
}

function getFreeBikeCountOffer2(vehicles_count){
    let offerCount = 0;

    if (vehicles_count.bikes >= 2)
        offerCount = 1;

    return offerCount;
}

const getTotalPrice =(vehiclesList) => {
    let result = 0;

    if(vehiclesList !=null){
        for (let i = 0; i < vehiclesList.length; i++) {
            let vehicle = vehiclesList[i];
          
            result += vehicle.price * vehicle.quantity
        }
    }

    return result;
}

const getTotalPriceByVehicle = (vehicle) => {
    // console.log(vehicle);
    return (vehicle!= null) ? vehicle.price * vehicle.quantity : 0
};

function resetAllData(){
    vehicles.forEach((item) => item.quantity = 0);
    offerList.forEach((item) => {
        item.accept_message = "";
        item.reject_message = "";
        item.quantity = 0;
        item.status = null;
    });

    total_cart_quantity = 0;
    total_offer_quantity = 0;
    acceped_offer_id = -1;
    rejected_offer_id = -1;
    discounts_for_rejects = 0;
    deleted_free_bikes = 0;
}

module.exports = vehicles;
module.exports = offerList;
module.exports = total_cart_quantity;
module.exports = total_offer_quantity;
module.exports = acceped_offer_id;
module.exports = rejected_offer_id;
module.exports = total_cart_quantity;
module.exports = discounts_for_rejects;
module.exports = deleted_free_bikes;

module.exports = resetAllData;
module.exports = updateVehicleQuantity;
module.exports = getVehiclesCount;
module.exports = getFreeBikeCountOffer1;
module.exports = getFreeBikeCountOffer2;
module.exports = getTotalPrice;
module.exports = getTotalPriceByVehicle;