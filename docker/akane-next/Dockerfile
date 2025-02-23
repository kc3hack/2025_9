FROM node:22 AS base

# Next.js はビルド時に環境変数を参照しているので、
# 環境変数をビルド時の引数として指定することで環境を切り分ける
ARG NODE_ENV=""
ARG DATABASE_URL=""
ARG TZ="Asia/Tokyo"
ARG MAPBOX_MAP_STYLE=""
ARG MAPBOX_ACCESS_TOKEN=""
ARG S3_ACCESS_KEY_ID=""
ARG S3_SECRET_ACCESS_KEY=""
ARG S3_BUCKET_NAME=""
ARG S3_BUCKET_URL=""
ARG S3_API_ENDPOINT=""

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV TZ=${TZ}
ENV NEXT_PUBLIC_MAPBOX_MAP_STYLE=${MAPBOX_MAP_STYLE}
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN}
ENV S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID}
ENV S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY}
ENV S3_BUCKET_NAME=${S3_BUCKET_NAME}
ENV S3_BUCKET_URL=${S3_BUCKET_URL}
ENV S3_API_ENDPOINT=${S3_API_ENDPOINT}

USER node
WORKDIR /app

RUN mkdir -p /app/packages/akane-next
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node packages/akane-next/package.json ./packages/akane-next/

RUN npm install

#
# 開発環境向け
#
FROM base AS development

USER node
WORKDIR /app

COPY --chown=node:node ./packages/akane-next ./packages/akane-next
COPY --from=base --chown=node:node /app/node_modules ./node_modules
WORKDIR /app/packages/akane-next

RUN npm run prisma:generate

CMD ["npm", "run", "dev"]

#
# ビルドだけしておく image
#
FROM base AS build

RUN mkdir -p /app/.next

WORKDIR /app
COPY --chown=node:node ./packages/akane-next ./packages/akane-next
COPY --from=base --chown=node:node /app/node_modules ./node_modules
WORKDIR /app/packages/akane-next

RUN npm run build

#
# 本番環境向け
#
FROM base AS production

USER node
WORKDIR /app/packages/akane-next

COPY --chown=node:node --from=build /app/packages/akane-next/.next ./.next
COPY --chown=node:node --from=build /app/packages/akane-next/public ./public
COPY --chown=node:node --from=build /app/packages/akane-next/next.config.ts ./next.config.ts
COPY --chown=node:node --from=build /app/packages/akane-next/package.json ./package.json
COPY --chown=node:node --from=build /app/node_modules ../../node_modules
COPY --chown=node:node --from=build /app/packages/akane-next/prisma/schema.prisma ./prisma/schema.prisma

CMD ["npm", "start"]
