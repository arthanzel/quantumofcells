import channel from "./channel";

export default function makeToast(message) {
    channel.publish(channel.TOAST, message);
};