/* eslint-disable function-paren-newline */
const { interval } = require('rxjs');
const { fromFetch }    = require('rxjs/fetch');
const {
    startWith,
    switchMap,
    share,
    finalize
} = require('rxjs/operators');

const {
    BASE_API_URL,
    TOKEN,
    STOCK_PRICE_PATH,
    REQUESTS_INTERVAL
} = require('../../../../config/stockPrice');

// eslint-disable-next-line func-style
const createStockPriceStream = () => {
    const streams = {};

    return stockSymbol => {
        if (streams[stockSymbol]) return streams[stockSymbol];

        streams[stockSymbol] = interval(REQUESTS_INTERVAL).pipe(
            startWith(0), // starts immediately
            switchMap(() =>
                fromFetch(`${BASE_API_URL}/${stockSymbol}${STOCK_PRICE_PATH}?token=${TOKEN}`).pipe(
                    switchMap(response => {
                        if (response.ok) {
                            return response.json();
                        }

                        throw new Error(`Request error: status code - ${response.statusCode}`);
                    }),
                )
            ),
            share(),
            finalize(() => delete streams[stockSymbol])
        );

        return streams[stockSymbol];
    };
};

module.exports = createStockPriceStream;
