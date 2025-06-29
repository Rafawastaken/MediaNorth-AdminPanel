// src/helpers/computeContractActive.js

/**
 * Devolve `true` se o contracto ainda estiver ativo
 * 
 * @param {string|Date} contractEndDate - ISO string ou data
 */
export function isContractActive(contractEndDate) {
    if (!contractEndDate) return false;

    const endDate = new Date(contractEndDate).getTime();
    const currentDate = Date.now();

    return endDate > currentDate;
}
