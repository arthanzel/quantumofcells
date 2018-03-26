import postal from "postal";

// Messaging subsystem message types
export const MESSAGE_SIMULATE = "MESSAGE_SIMULATE";
export const MESSAGE_MAKE_TOAST = "MESSAGE_MAKE_TOAST";
export const MESSAGE_CLEAR_TOASTS = "MESSAGE_CLEAR_TOASTS";
export const MESSAGE_CHANGE_SIDEBAR_TAB = "MESSAGE_CHANGE_SIDEBAR_TAB";

export const MESSAGE_DURATION_LONG = 7500;
export const MESSAGE_DURATION_SHORT = 4000;

export const messageChannel = postal.channel("qoc");

export function clearToasts() {
    messageChannel.publish(MESSAGE_CLEAR_TOASTS, null);
}

/**
 * Displays a toast notification with a provided message.
 * @param message {string} Message to display.
 * @param duration {int} How long should the message be displayed, in milliseconds.
 * Defaults to MESSAGE_DURATION_SHORT.
 */
export function makeToast(message, duration = MESSAGE_DURATION_SHORT) {
    // TODO: Add duration
    messageChannel.publish(MESSAGE_MAKE_TOAST, message);
}