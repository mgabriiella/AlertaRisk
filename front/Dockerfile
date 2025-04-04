FROM node:22.14

ENV INSTALL_PATH /alerta-risk-front

RUN mkdir $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN npm install

RUN npm install -g vite

RUN npm install lucide-react react react-dom leaflet

COPY . .
