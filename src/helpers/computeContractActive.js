import { parseISO, isAfter, isEqual } from "date-fns";

// src/helpers/isContractActive.js
export function isContractActive(isoDate) {
    if (!isoDate) return true;          // sem data → assume activo

    // normaliza para meia-noite (evita diferenças de fuso horário)
    const end = new Date(isoDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return end >= today;
}


export function computeContractActive(contract_end_date) {
    if (!contract_end_date) return true;          // sem data = assume-se ativo
    const end = parseISO(contract_end_date);
    return isAfter(end, new Date());              // true se ainda não passou
}
