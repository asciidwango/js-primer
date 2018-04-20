export const wait = (waitMs: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, waitMs);
    })
};
