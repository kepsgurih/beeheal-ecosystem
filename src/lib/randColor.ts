const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
};

const intToRGB = (value: number): string => {
    const r = (value >> 16) & 0xff;
    const g = (value >> 8) & 0xff;
    const b = value & 0xff;
    return `rgb(${r},${g},${b})`;
};

export const getColorFromId = (id: string) => {
    const hash = hashCode(id);
    return intToRGB(hash);
};
