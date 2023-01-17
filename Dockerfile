FROM public.ecr.aws/docker/library/node:16-alpine AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm cache clean --force
RUN npm run app-build

FROM public.ecr.aws/nginx/nginx:1.21.6-alpine


LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/dist/dtc-portal-web .

# RUN envsubst < /usr/share/nginx/html/assets/envs/env.template.json > /usr/share/nginx/html/assets/envs/env.json
## add permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
	chmod -R 755 /usr/share/nginx/html && \
	chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
	chmod 777 /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
