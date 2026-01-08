// api/devices.js
let devices = {
  light: false,
  fan: false,
  socket: false
};

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(devices); // return current state
  } else if (req.method === "POST") {
    // Update states
    const { light, fan, socket } = req.body;
    if (light !== undefined) devices.light = light;
    if (fan !== undefined) devices.fan = fan;
    if (socket !== undefined) devices.socket = socket;

    res.status(200).json(devices);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
