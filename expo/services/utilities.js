const isEmpty = (value) => {
    if (value == null) return true;

    if (typeof value === "string") {
        return value.trim() === "";
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === "object") {
        return Object.keys(value).length === 0;
    }

    return false;
};

const chance = (probability) => {
    return Math.random() * 100 < probability;
};

const weightedRandom = (options) => {
    const entries = Object.entries(options);
    const totalProbability = entries.reduce(
        (sum, [probability]) => sum + Number(probability),
        0
    );

    let random = Math.random() * totalProbability;

    for (const [probability, value] of entries) {
        random -= Number(probability);

        if (random < 0) {
            return value;
        }
    }

    return entries[entries.length - 1][1];
};

export { isEmpty, chance, weightedRandom }