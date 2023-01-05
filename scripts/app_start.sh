#!/bin/bash
cd /home/ec2-user/server/src
echo about to start pm2
pm2 start npm --name "eve-react-app" -- start
echo about to startup
pm2 startup
echo about to save
pm2 save
echo about to restart all
pm2 restart all