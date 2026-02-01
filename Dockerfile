# Stage 1: Build the application
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built artifacts from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Fix file permissions for all files (PDF files had 700 permissions)
RUN chmod -R 644 /usr/share/nginx/html/*.pdf 2>/dev/null || true && \
    chmod -R 755 /usr/share/nginx/html/

# Custom Nginx config to handle React Router (SPA) and static files
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
listen 80;
server_name localhost;
root /usr/share/nginx/html;
index index.html;

# Handle SPA routing
location / {
try_files $uri $uri/ /index.html;
}

# Serve static files directly with proper headers
location ~* \.(pdf|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|glb|jsdos|js|css)$ {
expires 1y;
add_header Cache-Control "public, immutable";
try_files $uri =404;
}
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
