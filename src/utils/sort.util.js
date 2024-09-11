export const SORT_OPTIONS = {
    az: (a, b) => a.name.localeCompare(b.name),
    za: (a, b) => b.name.localeCompare(a.name),
    lohi: (a, b) => a.price - b.price || a.name.localeCompare(b.name),
    hilo: (a, b) => b.price - a.price || a.name.localeCompare(b.name),
};
