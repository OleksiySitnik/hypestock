# hypestock

## Launching

To launch this app docker and docker-compose required

```shell
# clone the repo
git clone https://github.com/batovpasha/hypestock 
# change directory
cd hypestock/ 
# copy .env file and setup corresponding variables
cp .env.sample .env
# start the application services
docker-compose up -d
```

## Launching in dev mode
```shell
# install server deps
npm i
# build dev images
docker-compose -f docker-compose.develop.yml -f docker-compose.yml build
# start the application services in dev mode
docker-compose -f docker-compose.develop.yml -f docker-compose.yml up -d
```
