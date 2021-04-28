function updateQuantity(v_id, number) {

    if (document.getElementById("completed-order").style.display == "block")
        document.getElementById("completed-order").style.display = "none";

    vehicles = updateVehicleQuantity(v_id, number, vehicles)

    if (v_id == 4 && number < 0)
        deleted_free_bikes += number * (-1);
    else {
        acceped_offer_id = -1;
        rejected_offer_id = -1;
        discounts_for_rejects = 0;
        deleted_free_bikes = 0;
        vehicles[3].quantity = 0;
        discountOffer_1();
        discountOffer_2();
        renderOfferTable();
    }
    renderCart();
}

function discountOffer_1() {
    const vehicles_count = getVehiclesCount(vehicles);
    let offerCount = getFreeBikeCountOffer1(vehicles_count)

    if (offerCount > 0)
         updateOfferList(
            0,
            "If you accept this offer, then you can get <b>" + offerCount + "</b> bike(s) for free",
            "If you reject this offer, then you will get <b>$" + offerCount * 50 + "</b> discount instead of offered " + offerCount + " free bike(s)",
            offerCount,
            null);
}

function discountOffer_2() {
    const vehicles_count = getVehiclesCount(vehicles);
    let offerCount = getFreeBikeCountOffer2(vehicles_count);

    if (offerCount > 0)
         updateOfferList(
            1,
            "If you accept this offer, then you can get <b>one</b> of your selected bikes for free",
            "If you reject this offer, then you will get <b>$50</b> discount instead of offered one free bike",
            offerCount,
            null);
}

function updateOfferList(index, accept_msg, reject_msg, quantity, status) {
    total_offer_quantity += quantity;
    offerList[index].accept_message = accept_msg
    offerList[index].reject_message = reject_msg;
    offerList[index].quantity = quantity;
    offerList[index].status = status;
}

function updateOfferStatus(offerId, quantity, status) {

    if (status == 'accepted') {
        acceped_offer_id = offerId;
        offerList[offerId - 1].status = status;
        vehicles[3].quantity += quantity;
    } else if (status == 'rejected') {
        rejected_offer_id = offerId;
        offerList[offerId - 1].status = status;
        discounts_for_rejects = quantity * 50;
    }

    renderCart();
    renderOfferTable();
}


function renderCart() {
    const $cart = document.querySelector(".cart");
    const $total = document.querySelector(".total");
    const $discountAlert = document.querySelector(".discount-alert");
    let totalPrice = 0;

    if (total_cart_quantity > 0) {
        document.getElementById("cart").style.display = "block";
        $cart.innerHTML = vehicles.map((item) => {
            currentPrice = getTotalPriceByVehicle(item);
            totalPrice += currentPrice;
            if (item.quantity > 0) {
                html = `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>`;

                if (item.id == 4)
                    html += `<td style="width: 60px;"></td>`;
                else
                    html += `<td style="width: 60px;">	
                                <button type="button" class="btn btn-block btn-sm btn-outline-primary"
                                    onClick="updateQuantity(${item.id},1)">+</button>
                            </td>`;

                html += `<td style="width: 60px;">	
                            <button type="button" class="btn btn-block btn-sm btn-outline-primary"
                                onClick="updateQuantity(${item.id},-1)">-</button>
                        </td>
                        <td></td>
                        <td class="text-center">$${currentPrice}</td>
                        <td class="text-right"><Button class="btn btn-outline-secondary" onClick="updateQuantity(${item.id}, -${item.quantity})">Delete</Button></td>
                        </tr>`
                return html;
            }
        }).join("");
    } else
        document.getElementById("cart").style.display = "none";


    if (deleted_free_bikes > 0) {
        $total.innerHTML = "Total: $" + (totalPrice - deleted_free_bikes * 50);
        $discountAlert.innerHTML = "You got a $" + (deleted_free_bikes * 50) + " discount because of the " + deleted_free_bikes + " deleted free bikes.";
    } else if (discounts_for_rejects > 0) {
        $total.innerHTML = "Total: $" + (totalPrice - discounts_for_rejects);
        $discountAlert.innerHTML = "You got a $" + discounts_for_rejects + " discount because of the rejected offers.";
    } else {
        $total.innerHTML = "Total: $" + totalPrice;
        $discountAlert.innerHTML = ""
    }
}

function renderOfferTable() {
    const $discountTable = document.querySelector(".discount-offer-table");

    if (total_offer_quantity > 0) {
        document.getElementById("discount-offer").style.display = "block";
        $discountTable.innerHTML = offerList.map((offer) => {
            let html = `<tr>
                            <td>${offer.accept_message}</td>
                            <td>${offer.reject_message}</td>`;
            if (acceped_offer_id > 0) {
                if (offer.id == acceped_offer_id) {
                    html += ` <td></td>
                        <td style="width: 60px;">	
                            <button type="button" class="btn btn-static text-success btn-sm">
                                Accepted
                            </button>
                        </td></tr>`;
                    return html;
                }
            } else if (rejected_offer_id > 0) {
                if (offer.id == rejected_offer_id) {
                    html += ` <td></td>
                            <td style="width: 60px;">	
                                <button type="button" class="btn btn-static text-secondary btn-sm">
                                    Rejected
                                </button>
                            </td></tr>`;
                    return html;
                }
            } else if (offer.quantity > 0 && offer.status == null) {
                html += ` <td style="width: 60px;">	
                            <button type="button" class="btn btn-block btn-sm btn-outline-primary"
                                onClick="updateOfferStatus(${offer.id},${offer.quantity}, 'accepted')">Accept</button>
                        </td>
                        <td style="width: 60px;">	
                            <button type="button" class="btn btn-block btn-sm btn-outline-secondary"
                                onClick="updateOfferStatus(${offer.id},${offer.quantity}, 'rejected')">Reject</button>
                        </td></tr>`;
                return html;
            } else
                return "";

        }).join("");
    } else
        document.getElementById("discount-offer").style.display = "none";
}

function renderInvoiceTable() {
    const $invoiceDetailsTable = document.querySelector(".invoice-details-table");
    const $totalInvoice = document.querySelector(".total-invoice");

    let totalPrice = 0;
    let html = ``;

    vehicles.forEach((item) => {
        currentPrice = getTotalPriceByVehicle(item);
        totalPrice += currentPrice;
        if (item.quantity > 0) {
            html += `<tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td class="text-center">${item.quantity}</td>
                            <td>$${currentPrice}</td>
                         </tr>`

        }
    });

    $invoiceDetailsTable.innerHTML = html;

    if (acceped_offer_id > 0)
        document.querySelector(".accepted-offer").innerHTML =
        `<b>Accepted offers:</b> ` + offerList[acceped_offer_id - 1].quantity + ` free bike(s) offer accepted`;

    if (deleted_free_bikes > 0) {
        totalPrice -= deleted_free_bikes * 50
        document.querySelector(".discount-list").innerHTML =
            `<b>Discounts:</b> $` + (deleted_free_bikes * 50) + " discount because of the " + deleted_free_bikes + " deleted free bikes.";
    } else if (discounts_for_rejects > 0) {
        totalPrice -= discounts_for_rejects
        document.querySelector(".discount-list").innerHTML =
            `<b>Discounts:</b> $` + (discounts_for_rejects * 50) + " discount because of the rejected offer";
    }

    $totalInvoice.innerHTML = `<b>Total Price:</b> $` + totalPrice;
}

function reset() {
    resetAllData();

    renderCart();
    renderOfferTable();
}

function checkout() {
    reset();
    document.getElementById("completed-order").style.display = "block";
}

module.exports.updateQuantity = updateQuantity;
module.exports.discountOffer_1 = discountOffer_1;
module.exports.discountOffer_2 = discountOffer_2;
module.exports.updateOfferList = updateOfferList;
module.exports.updateOfferStatus = updateOfferStatus;
module.exports.renderCart = renderCart;
module.exports.renderOfferTable = renderOfferTable;
module.exports.renderInvoiceTable = renderInvoiceTable;
module.exports.reset = reset;
module.exports.checkout = checkout;