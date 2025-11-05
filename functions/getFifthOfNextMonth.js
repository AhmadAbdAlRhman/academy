const getFifthOfNextMonth = () => {
    const now = new Date();
    const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const month = now.getMonth() === 11 ? 0 : now.getMonth() + 1;
    return new Date(year, month, 5, 23, 59, 59); // آخر ثانية من يوم 5
}

module.exports = {
    getFifthOfNextMonth
}