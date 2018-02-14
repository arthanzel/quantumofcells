import postal from "postal";

let c = postal.channel("qoc");
export default c;

// Define message types right on the channel for convenience
c.SIMULATE = "SIMULATE";