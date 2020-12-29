/* eslint-disable function-paren-newline */
const { of, interval } = require('rxjs');
const { fromFetch }    = require('rxjs/fetch');
const {
    startWith,
    switchMap,
    catchError,
    map,
    share
} = require('rxjs/operators');

const { REQUESTS_INTERVAL, BASE_API_URL } = require('../../../../config/stockPrice');

// eslint-disable-next-line func-style
const createStockPriceStream = (stockSymbol) =>
    interval(REQUESTS_INTERVAL)
        .pipe(
            startWith(0), // starts immediately
            switchMap(() =>
                fromFetch(`${BASE_API_URL}/${stockSymbol}`).pipe(
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
                ).pipe(
                    map(({ chart: { result: [ { meta: { regularMarketPrice } } ] } }) => regularMarketPrice)
                )
            ),
            share()
        );

module.exports = createStockPriceStream;
