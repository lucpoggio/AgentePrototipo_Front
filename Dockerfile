# Dockerfile para el frontend React + Vite
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Puerto expuesto por Vite
EXPOSE 3000

# Levantar Vite en modo dev, escuchando en todas las interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
