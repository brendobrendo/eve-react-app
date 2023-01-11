#!/bin/bash
cd /home/ec2-user/server
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
yum -y install nodejs npm
cd scripts
chmod +x after_install.sh
chmod +x app_start.sh