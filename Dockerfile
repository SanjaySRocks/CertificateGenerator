FROM node:latest
WORKDIR /app
RUN apt update -y && apt upgrade -y
RUN apt install git -y
RUN git clone https://github.com/SanjaySRocks/CertificateGenerator.git .
RUN npm install
RUN npm install nodemon

EXPOSE 3000
CMD ["npm","start"]
