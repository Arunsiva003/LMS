FROM mhart/alpine-node

WORKDIR /usr/src/app

COPY package*  .

RUN npm install

COPY . .

EXPOSE 3036

CMD [ "npm", "start" ]
