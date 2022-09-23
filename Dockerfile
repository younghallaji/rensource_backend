FROM nginx:latest

COPY .  /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY config/rensourcecert.crt /etc/nginx/certs/rensourcecert.crt
COPY config/rensourcecert.key /etc/nginx/certs/rensourcecert.key

EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]