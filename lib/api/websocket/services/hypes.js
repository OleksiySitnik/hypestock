/* eslint-disable no-param-reassign */
const { of, interval, from, empty } = require('rxjs');
const { fromFetch }                 = require('rxjs/fetch');
const {
    startWith,
    switchMap,
    catchError,
    share,
    finalize,
    filter,
    scan,
    map
} = require('rxjs/operators');

const {
    BASE_API_URL,
    REQUESTS_INTERVAL,
    HYPES_PATH
} = require('../../../../config/hypes');

const {
    IEX_TOKEN
} = require('../../../../config/iex');

// eslint-disable-next-line func-style
const createHypesStream = () => {
    const streams = {};

    // eslint-disable-next-line no-unused-vars
    return (stockSymbol, keywords = []) => {
        if (streams[stockSymbol]) return streams[stockSymbol];

        streams[stockSymbol] = interval(REQUESTS_INTERVAL).pipe(
            startWith(0), // starts immediately
            switchMap(() =>
                fromFetch(`${BASE_API_URL}/${stockSymbol}${HYPES_PATH}/last/50?token=${IEX_TOKEN}`).pipe(
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
                )),
            switchMap(newsArr => from(newsArr)),
            filter(news => news.lang === 'en'), // accept only news in english
            scan((acc, news) => {
                if (!acc.allNews[news.url]) {
                    acc.allNews[news.url] = news;
                    acc.newNews = news;
                } else {
                    acc.newNews = null;
                }

                return acc;
            }, { allNews: {}, newNews: null }),
            switchMap(({ newNews }) => newNews ? of(newNews) : empty()),
            map(({ headline, url, summary, image, datetime }) => ({
                title    : headline,
                imageUrl : image,
                summary,
                url,
                datetime
            })),
            share(),
            finalize(() => delete streams[stockSymbol])
        );

        return streams[stockSymbol];
    };
};

module.exports = createHypesStream;
