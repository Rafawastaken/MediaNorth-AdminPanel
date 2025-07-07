/**
 * Recebe um array de ligações `device_video` (cada linha tem device_id)
 * e devolve três conjuntos de TVs:
 *  - manyAds     : > 10 anúncios
 *  - balancedAds : exactamente 10 anúncios
 *  - fewAds      : < 10 anúncios
 */
export function computeTvAdLoad(deviceVideoRows) {
    const counter = new Map();            // device_id → nº de vídeos

    deviceVideoRows.forEach(({ device_id }) => {
        counter.set(device_id, (counter.get(device_id) ?? 0) + 1);
    });

    const manyAds = [];
    const balancedAds = [];
    const fewAds = [];

    counter.forEach((qty, devId) => {
        if (qty > 10) manyAds.push({ id: devId, qty });
        else if (qty === 10) balancedAds.push({ id: devId, qty });
        else fewAds.push({ id: devId, qty });
    });

    return { manyAds, balancedAds, fewAds };
}
