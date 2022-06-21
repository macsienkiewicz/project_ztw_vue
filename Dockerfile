



FROM node:16

RUN mkdir -p /opt/app

WORKDIR /opt/app

RUN adduser --disabled-password app

COPY . .

RUN chown -R app:app /opt/app

USER app

RUN npm install

RUN npm run build

EXPOSE 8086

CMD [ "npm", "run", "serve" ]




