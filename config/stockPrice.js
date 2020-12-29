module.exports = Object.freeze({
    BASE_API_URL      : process.env.STOCK_PRICE_BASE_API_URL || 'https://query1.finance.yahoo.com/v7/finance/chart',
    // eslint-disable-next-line no-magic-numbers
    REQUESTS_INTERVAL : process.env.STOCK_PRICE_REQUESTS_INTERVAL || 1000
});
