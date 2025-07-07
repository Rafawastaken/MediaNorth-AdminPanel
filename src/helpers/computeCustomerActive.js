// um “cliente ativo” = contrato ainda em vigor (contract_end_date ≥ hoje)

import { isAfter, parseISO } from "date-fns";

/**
 * Recebe um array de clientes (campos id + contract_end_date) e devolve:
 * { total, active, inactive }
 */
export function computeCustomerActive(customers = []) {
    const today = new Date();

    let active = 0;
    customers.forEach((c) => {
        if (!c.contract_end_date) return;               // sem data ⇒ ignora
        if (isAfter(parseISO(c.contract_end_date), today)) active += 1;
    });

    return {
        total: customers.length,
        active,
        inactive: customers.length - active,
    };
}
