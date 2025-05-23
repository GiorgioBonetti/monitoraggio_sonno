// Funzione per ottenere una data valida dai search param
export function getValidDateFromSearchParams(
    searchParams: URLSearchParams,
): Date {
    const param = searchParams.get("date");
    if (param && !isNaN(Date.parse(param))) {
        const parsedDate = new Date(param);
        if (parsedDate > new Date()) {
            return new Date();
        }
        return parsedDate;
    }
    return new Date();
}
