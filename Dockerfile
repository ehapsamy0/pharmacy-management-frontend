# Stage 2: Use Nginx to serve the pre-built app
FROM nginx:alpine

# Copy the pre-built build folder to Nginx
COPY ./build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
