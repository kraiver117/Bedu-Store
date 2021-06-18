import emailjs from 'emailjs-com';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_RESET_PASSWORD_TEMPLATE_ID;
const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

export const sendEmail = async (to_email, from_name, new_Password) => {

    const TEMPLATE_PARAMS = {
        "from_name": from_name,
        "to_email": to_email,
        "new_password": new_Password
    }

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, TEMPLATE_PARAMS, USER_ID)
        .then((result) => {
            return true;
        })
        .catch((error) => {
            return false;
        });
}