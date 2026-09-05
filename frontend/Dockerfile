FROM node:20-alpine AS prod

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci 

COPY . .


RUN npm run build

#stage 2

FROM nginx:alpine

COPY --from=prod /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]