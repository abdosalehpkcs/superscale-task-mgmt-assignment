# Stage 1: Build
# FROM node:20-alpine3.17 AS base-node
# WORKDIR /taskmgmt-ui-workdir
# COPY package*.json  /taskmgmt-ui-workdir/
# RUN npm ci
# COPY . /taskmgmt-ui-workdir
# RUN npm run build

# Stage 2, use the built version and nginxifing it.
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/
COPY /dist/superscale-task-mgmt-assignment/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
