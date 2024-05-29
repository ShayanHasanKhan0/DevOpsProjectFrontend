# base image
FROM node:14 as build

# set working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files and folders to the current working directory
COPY . .

# build angular app
RUN npm run build --prod

# production environment
FROM nginx:1.19-alpine
COPY --from=build /usr/src/app/dist/angular-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
