#!/bin/bash
cd /home/ec2-user/server/src
echo lsof -i tcp:3000
echo About to start npm
npm start
echo finished npm start
pm2 start npm --name "eve-react-app" -- start
pm2 startup
pm2 save
pm2 restart all