/* eslint-disable function-paren-newline */
const { of, interval } = require('rxjs');
const { fromFetch }    = require('rxjs/fetch');
const {
    startWith,
    switchMap,
    catchError,
    share
} = require('rxjs/operators');

const {
    REQUESTS_INTERVAL,
    BASE_API_URL,
    IEX_TOKEN
} = require('../../../../config/stockPrice');

// eslint-disable-next-line func-style
const createStockPriceStream = (stockSymbol) =>
    interval(REQUESTS_INTERVAL)
        .pipe(
            startWith(0), // starts immediately
            switchMap(() =>
                fromFetch(`${BASE_API_URL}/${stockSymbol}/quote/latestPrice?token=${IEX_TOKEN}`).pipe(
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
            share()
        );

module.exports = createStockPriceStream;
