FROM node:18-alpine AS development

ARG SERVICE_NAME

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json nest-cli.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY common/rabbitmq common/rabbitmq
COPY core/user core/user
COPY apps/user/api-user-query apps/user/api-user-query

COPY apps/$SERVICE_NAME apps/$SERVICE_NAME

RUN pnpm build $SERVICE_NAME