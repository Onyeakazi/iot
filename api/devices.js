// api/devices.js
export default function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // handle preflight
  }

  let devices = {
    light: false,
    fan: false,
    socket: false
  };

  if (!global.deviceStates) global.deviceStates = devices;
  devices = global.deviceStates;

  if (req.method === "GET") {
    res.status(200).json(devices);
  } else if (req.method === "POST") {
    const { light, fan, socket } = req.body;
    if (light !== undefined) devices.light = light;
    if (fan !== undefined) devices.fan = fan;
    if (socket !== undefined) devices.socket = socket;

    global.deviceStates = devices;
    res.status(200).json(devices);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
