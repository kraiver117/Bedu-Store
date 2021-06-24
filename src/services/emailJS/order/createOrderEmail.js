import emailjs from 'emailjs-com';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ORDER_TEMPLATE_ID;
const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

export const createOrderEmail = async (orderId, toEmail, fromName, orderData) => {

    const TEMPLATE_PARAMS = {
        "order_id": orderId,
        "order_link": `https://bedu-store.netlify.app/order/${orderId}`,
        "from_name": fromName,
        "to_email": toEmail.email,
        "user_name": toEmail.fullName,
        "shipping_address": orderData.shippingAddress,
        "payment_method": orderData.paymentMethod,
        "items_price": orderData.itemsPrice,
        "shipping_price": orderData.shippingPrice,
        "total_price": orderData.totalPrice
    }

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, TEMPLATE_PARAMS, USER_ID)
            .then((result) => {
                return true;
            })
            .catch((error) => {
                return false;
            })
}