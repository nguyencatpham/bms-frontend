# # build stage
# FROM --platform=$BUILDPLATFORM node:12.13.0-buster as build-stage

# ARG TARGETPLATFORM
# ARG BUILDPLATFORM

# # https://github.com/moby/buildkit/issues/816#issuecomment-582332458
# # RUN mkdir -p /public/build
# WORKDIR /public
# COPY package*.json ./
# RUN npm install -v
# COPY . .
# RUN npm run build

# # production stage
FROM nginx:stable-alpine as production-stage
RUN npm install --silent
RUN npm build
COPY ./build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /usr/bin/

RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE 80

CMD ["/usr/bin/entrypoint.sh"]
