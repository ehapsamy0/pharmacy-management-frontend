# Stage 2: Use Nginx to serve the pre-built app
FROM nginx:alpine

# Copy the pre-built build folder to Nginx
COPY ./build /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
