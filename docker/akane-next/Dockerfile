FROM node:22 AS base

# Next.js はビルド時に環境変数を参照しているので、
# 環境変数をビルド時の引数として指定することで環境を切り分ける
ARG NODE_ENV=""
ARG DATABASE_URL=""
ARG TZ="Asia/Tokyo"
ARG MAPBOX_MAP_STYLE=""
ARG MAPBOX_ACCESS_TOKEN=""

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV TZ=${TZ}
ENV NEXT_PUBLIC_MAPBOX_MAP_STYLE=${MAPBOX_MAP_STYLE}
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${MAPBOX_ACCESS_TOKEN}

USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

#
# 開発環境向け
#
FROM base AS development

USER node
WORKDIR /app

COPY --chown=node:node . .
COPY --from=base --chown=node:node /app/node_modules ./node_modules

RUN npm run prisma:generate

CMD ["npm", "run", "dev"]

#
# ビルドだけしておく image
#
FROM base AS build

RUN mkdir -p /app/.next

WORKDIR /app
COPY --chown=node:node . .
COPY --from=base --chown=node:node /app/node_modules ./node_modules

RUN npm run build

#
# 本番環境向け
#
FROM base AS production

USER node
WORKDIR /app

COPY --chown=node:node --from=build /app/.next ./.next
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/next.config.ts ./next.config.ts
COPY --chown=node:node --from=build /app/package.json ./package.json
COPY --chown=node:node --from=build /app/node_modules ./node_modules

CMD ["npm", "start"]
