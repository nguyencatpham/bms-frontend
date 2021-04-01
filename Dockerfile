# build stage
# FROM node:10.24.0-alpine3.11 as build-stage

# ARG TARGETPLATFORM
# ARG BUILDPLATFORM

# # https://github.com/moby/buildkit/issues/816#issuecomment-582332458
# # RUN mkdir -p /public/build
# WORKDIR /public
# COPY package*.json ./
# RUN npm install --silent
# COPY . .
# RUN npm run build

# # production stage
FROM nginx:stable-alpine as production-stage

COPY ./build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /usr/bin/

RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE 80

CMD ["/usr/bin/entrypoint.sh"]
