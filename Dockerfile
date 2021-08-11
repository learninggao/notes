FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod --force --legacy-peer-deps
COPY dist .

CMD ["npm", "start"]

# docker run --restart always --name plab -p 3003:3003 -d --net myrepose_net -e NODE_ENV=production gaotheta/plab

#steps
#1. make sure that you transpile backend code properly: (need a separate babelrc file | targets node, no react-preset and regenerators false)
#2. Make sure to only have backend dependency in dev section of package.json if not building ui in docker (need --only=prod --force --legacy-peer-deps)
#3. make sure you're serving express.static() from the right folder and that you are serving index.html from the right folder too
#4. make sure that the network is the custom one you specified so that all your dockers can see each other
#5. make sure that you refer to the service name where you connect to the db instead of localhost  (eg, postgres vs localhost in postgresql's case)
#6. profit
