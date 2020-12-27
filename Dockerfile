FROM node:lts

WORKDIR /app

COPY knexfile.js knexfile.js
COPY migrations/ migrations/
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index.js index.js

RUN npm i

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && npm run migration-production && npm start
