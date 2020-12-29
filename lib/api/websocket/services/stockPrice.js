/* eslint-disable function-paren-newline */
const { of, interval } = require('rxjs');
const { fromFetch }    = require('rxjs/fetch');
const {
    startWith,
    switchMap,
    catchError,
    share,
    finalize
} = require('rxjs/operators');

const {
    REQUESTS_INTERVAL,
    STOCK_PRICE_PATH
} = require('../../../../config/stockPrice');

const {
    BASE_API_URL,
    IEX_TOKEN
} = require('../../../../config/iex');

// eslint-disable-next-line func-style
const createStockPriceStream = () => {
    const streams = {};

    return stockSymbol => {
        if (streams[stockSymbol]) return streams[stockSymbol];

        streams[stockSymbol] = interval(REQUESTS_INTERVAL).pipe(
            startWith(0), // starts immediately
            switchMap(() =>
                fromFetch(`${BASE_API_URL}/${stockSymbol}${STOCK_PRICE_PATH}?token=${IEX_TOKEN}`).pipe(
                    switchMap(response => {
                        if (response.ok) {
                            return response.json();
                        }

                        return of({ error: true, message: `Status code: ${response.status}` });
                    }),
                    catchError(err => { // request error
                        console.error(err);

                        return of({ error: true, message: err.message });
                    })
                )
            ),
            share(),
            finalize(() => delete streams[stockSymbol])
        );

        return streams[stockSymbol];
    };
};

module.exports = createStockPriceStream;
