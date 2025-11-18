export function calculateDate(checkIn: Date, checkOut: Date): number{
    const diff = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diff/(1000 * 60 * 60 * 24));
    return diffDays
}