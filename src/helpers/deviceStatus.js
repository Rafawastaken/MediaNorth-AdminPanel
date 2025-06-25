// src/utils/deviceStatus.js

/**
 * Devolve `true` se o dispositivo foi visto há menos de `thresholdMinutes`.
 *
 * @param {string|Date} lastSeen         – ISO string ou Date
 * @param {number}      thresholdMinutes – minutos de tolerância (default 20)
 */
export function isDeviceOnline(lastSeen, thresholdMinutes = 20) {
    if (!lastSeen) return false;                         // nunca foi visto

    const last = new Date(lastSeen).getTime();
    const diffMs = Date.now() - last;

    return diffMs <= thresholdMinutes * 60_000;          // 20 min = 1 200 000 ms
}
