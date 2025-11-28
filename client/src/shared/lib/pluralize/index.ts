type DeclensionForms = [string, string, string];

export const pluralize = (
    n: number | undefined,
    forms: DeclensionForms,
    returnNum: boolean = true,
): string => {
    if (!n) return returnNum ? `${n} ${forms[2]}` : forms[2];

    const absN = Math.abs(n);

    if (!Number.isInteger(absN)) {
        return returnNum ? `${n} ${forms[2]}` : forms[2];
    }

    const mod100 = absN % 100;
    const mod10 = absN % 10;

    if (mod100 >= 11 && mod100 <= 14) {
        return returnNum ? `${n} ${forms[2]}` : forms[2];
    }

    if (mod10 === 1) {
        return returnNum ? `${n} ${forms[0]}` : forms[0];
    }

    if (mod10 >= 2 && mod10 <= 4) {
        return returnNum ? `${n} ${forms[1]}` : forms[1];
    }

    return returnNum ? `${n} ${forms[2]}` : forms[2];
};
