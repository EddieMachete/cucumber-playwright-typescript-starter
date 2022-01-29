# build environment
FROM node:14
FROM mcr.microsoft.com/playwright:focal

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./ ./

RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
RUN npm install

CMD ["npm", "start"]

# docker run -it --mount type=bind,source=$(pwd)/.env,target=/app/.env e2etest:v0 npm run only
# ENV PATH /node_modules/.bin:$PATH
