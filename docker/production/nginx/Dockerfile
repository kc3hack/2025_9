FROM nginx:latest

RUN rm -f /etc/nginx/conf.d/*
COPY conf.d/ /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/nginx.conf
