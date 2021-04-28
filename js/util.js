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

function updateVehicleQuantity(v_id, quantity, vehiclesList){
    let updatedVehicle = vehiclesList.find(vehicle=> vehicle.id = v_id -1)

    if(updatedVehicle && !(quantity < 0 && updatedVehicle.quantity <= 0)){
        updatedVehicle.quantity += quantity;
        total_cart_quantity += quantity;
    }

    return vehiclesList;
}

function getVehiclesCount(vehiclesList) {
    let result = {cars: 0, motorcycles: 0, bikes: 0};

    if(vehiclesList !=null && vehiclesList != []){
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

    if(vehicles_count == null || Object.keys(vehicles_count).length == 0)
        offerCount = 0;
    else if (vehicles_count.motorcycles / 2 >= vehicles_count.cars)
        offerCount = vehicles_count.cars;
    else
        offerCount = Math.floor(vehicles_count.motorcycles / 2) +
        Math.floor((vehicles_count.cars - Math.floor(vehicles_count.motorcycles / 2)) / 2);

    return offerCount;
}

function getFreeBikeCountOffer2(vehicles_count){
    let offerCount = 0;

    if (vehicles_count != null && vehicles_count.bikes >= 2)
        offerCount = 1;

    return offerCount;
}

const getTotalPrice =(vehiclesList) => {
    let result = 0;

    if(vehiclesList !=null && Object.keys(vehiclesList).length != 0)
        vehiclesList.forEach(vehicle => result += vehicle.price * vehicle.quantity);

    return result;
}

const getTotalPriceByVehicle = (vehicle) => {
    return (vehicle!= null && Object.keys(vehicle).length != 0) ? vehicle.price * vehicle.quantity : 0
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

module.exports.vehicles = vehicles;
module.exports.offerList = offerList;
module.exports.total_cart_quantity = total_cart_quantity;
module.exports.total_offer_quantity = total_offer_quantity;
module.exports.acceped_offer_id = acceped_offer_id;
module.exports.rejected_offer_id = rejected_offer_id;
module.exports.total_cart_quantity = total_cart_quantity;
module.exports.discounts_for_rejects = discounts_for_rejects;
module.exports.deleted_free_bikes = deleted_free_bikes;

module.exports.resetAllData = resetAllData;
module.exports.updateVehicleQuantity = updateVehicleQuantity;
module.exports.getVehiclesCount = getVehiclesCount;
module.exports.getFreeBikeCountOffer1 = getFreeBikeCountOffer1;
module.exports.getFreeBikeCountOffer2 = getFreeBikeCountOffer2;
module.exports.getTotalPrice = getTotalPrice;
module.exports.getTotalPriceByVehicle = getTotalPriceByVehicle;