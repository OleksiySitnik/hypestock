module.exports = Object.freeze({
    BASE_API_URL      : process.env.IEX_STOCK_BASE_API_URL || 'https://cloud.iexapis.com/stable/stock',
    HYPES_PATH        : '/news',
    // eslint-disable-next-line no-magic-numbers
    REQUESTS_INTERVAL : process.env.STOCK_PRICE_REQUESTS_INTERVAL || 60000
});
