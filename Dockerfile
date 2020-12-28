FROM node:lts

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY knexfile.js knexfile.js
COPY db/ db/
COPY config/ config/
COPY migrations/ migrations/
COPY index.js index.js
COPY server.js server.js
COPY lib/ lib/

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && npm run migration-production && npm start
