FROM mcr.microsoft.com/playwright:v1.61.1-noble

RUN apt update && apt install -y yq jq bash

WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY ./download.js /app/download.js
COPY ./curl-browser /usr/local/bin/curl-browser
RUN chmod a+x /usr/local/bin/curl-browser

ENTRYPOINT ["curl-browser"]