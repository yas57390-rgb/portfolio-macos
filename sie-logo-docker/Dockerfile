# Étape 1 : Construction
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Serveur Web
FROM nginx:alpine

# Copie des fichiers construits vers le dossier de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuration nécessaire pour React Router (optionnel ici mais bonne pratique)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
