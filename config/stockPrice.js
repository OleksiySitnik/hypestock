module.exports = Object.freeze({
    BASE_API_URL      : process.env.IEX_STOCK_BASE_API_URL || 'https://sandbox.iexapis.com/stable/stock',
    TOKEN             : process.env.IEX_SANDBOX_TOKEN,
    STOCK_PRICE_PATH  : '/quote/latestPrice',
    // eslint-disable-next-line no-magic-numbers
    REQUESTS_INTERVAL : process.env.STOCK_PRICE_REQUESTS_INTERVAL || 15000
});
