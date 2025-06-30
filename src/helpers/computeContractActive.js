// src/helpers/isContractActive.js
export function isContractActive(isoDate) {
    if (!isoDate) return true;          // sem data → assume activo

    // normaliza para meia-noite (evita diferenças de fuso horário)
    const end = new Date(isoDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return end >= today;
}
