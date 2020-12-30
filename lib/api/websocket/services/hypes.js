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
    TOKEN,
    REQUESTS_INTERVAL,
    HYPES_PATH
} = require('../../../../config/hypes');

// eslint-disable-next-line func-style
const createHypesStream = () => {
    const streams = {};

    // eslint-disable-next-line no-unused-vars
    return (stockSymbol, keywords = []) => {
        if (streams[stockSymbol]) return streams[stockSymbol];

        streams[stockSymbol] = interval(REQUESTS_INTERVAL).pipe(
            startWith(0), // starts immediately
            switchMap(() =>
                fromFetch(`${BASE_API_URL}/${stockSymbol}${HYPES_PATH}/last/50?token=${TOKEN}`).pipe(
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
            scan((acc, newsArr) => {
                const lastNewsUrls = acc.lastNews.map(x => x.url);
                const diff = newsArr.filter(x => !lastNewsUrls.includes(x));

                if (diff.length) {
                    acc.newNews = diff;
                } else {
                    acc.newNews = newsArr;
                }

                return acc;
            }, { lastNews: [], newNews: null }),
            switchMap(({ newNews }) => newNews ? from(newNews) : empty()),
            filter(news => news.lang === 'en'), // accept only news in english
            filter(news => {
                return keywords.some(keyword => {
                    // eslint-disable-next-line security/detect-non-literal-regexp
                    const regexp = new RegExp(keyword, 'i');

                    return regexp.test(news.headline) || regexp.test(news.summary);
                });
            }),
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
