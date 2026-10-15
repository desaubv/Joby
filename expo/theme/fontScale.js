
export const FONT_SCALES = {
    small: 0.85,
    normal: 1,
    large: 1.2,
    extraLarge: 1.4,
};

export function getFontScale(size) {
    return FONT_SCALES[size] ?? FONT_SCALES.normal;
}

export function getFontSize(baseSize, size = "normal") {
    return Math.round(baseSize * getFontScale(size));
}
