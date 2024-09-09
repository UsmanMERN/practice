import { message } from "antd";


// eslint-disable-next-line
window.isEmail = email => /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);

message.config({
    duration: 2,
    maxCount: 3,
});

window.toastify = (text, type) => {
    switch (type) {
        case "error": return message.error(text)
        case "success": return message.success(text)
        case "warning": return message.warning(text)
        default: return message.info(text)
    }
}

window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)