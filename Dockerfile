FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=5 CMD node -e "fetch('http://localhost:3000/health').then(response => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1))"

CMD ["npm", "run", "dev"]