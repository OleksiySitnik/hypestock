module.exports = Object.freeze({
    BASE_API_URL      : process.env.IEX_STOCK_PRICE_BASE_API_URL || 'https://sandbox.iexapis.com/stable/stock/',
    IEX_TOKEN         : process.env.IEX_TOKEN,
    // eslint-disable-next-line no-magic-numbers
    REQUESTS_INTERVAL : process.env.STOCK_PRICE_REQUESTS_INTERVAL || 1000
});
