import { temperatureStatus } from "../enums/values";
import { isDeviceOnline } from "./deviceStatus";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export function getDeviceMeta(device) {
    const { temperature, schedule, last_seen } = device;

    /* online/offline (20 min) */
    const online = isDeviceOnline(last_seen);

    /* temperatura normalizada + cor */
    const tempLabel = temperatureStatus[temperature] ?? temperatureStatus.other;
    const tempColor =
        tempLabel === "Alta"
            ? "text-red-600"
            : tempLabel === "Baixa"
                ? "text-blue-600"
                : "text-emerald-600";

    /* horário de hoje */
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const key = weekdays[new Date().getDay()];
    const obj =
        typeof schedule === "string" ? JSON.parse(schedule || "{}") : schedule || {};
    const sched =
        obj?.[key]?.from && obj?.[key]?.to ? `${obj[key].from} - ${obj[key].to}` : "—";

    /* última atividade */
    const lastSeenStr = last_seen
        ? format(new Date(last_seen), "dd/MM/yyyy HH:mm", { locale: pt })
        : "—";

    return { online, tempLabel, tempColor, sched, lastSeenStr };
}
