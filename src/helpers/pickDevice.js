// src/helpers/pickDevice.js
export function pickDevice(devices = [], idDevice) {
    const target = Number(idDevice);            //  ← força número
    return devices.find((d) => Number(d.id) === target);
}
