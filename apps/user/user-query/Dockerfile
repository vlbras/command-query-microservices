FROM node:18-alpine AS development

ARG DOMAIN_NAME
ARG SERVICE_NAME

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json nest-cli.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY common/mongodb common/mongodb 
COPY common/rabbitmq common/rabbitmq

COPY core/$DOMAIN_NAME core/$DOMAIN_NAME
COPY common/$DOMAIN_NAME common/$DOMAIN_NAME

ARG SERVICE_API_PATH=$DOMAIN_NAME/api-$SERVICE_NAME
ARG SERVICE_PATH=$DOMAIN_NAME/$SERVICE_NAME
COPY apps/$SERVICE_API_PATH apps/$SERVICE_API_PATH
COPY apps/$SERVICE_PATH apps/$SERVICE_PATH

RUN pnpm build $SERVICE_NAME