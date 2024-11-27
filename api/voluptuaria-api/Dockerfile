FROM node:22-alpine AS dev

# meta datas

LABEL authors = "Yahaya Bathily - Pascal Perilovisi Vigneau - Ambroise Pouwedeou Kilimou, Renkas Vitalii"
LABEL api-version = "11.09.24"

# setup workspace and project

WORKDIR /app

COPY package*.json ./
RUN npm i -g @nestjs/cli
RUN npm i -g nodemon
RUN npm i

COPY . .
