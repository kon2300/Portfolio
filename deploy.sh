#!/bin/sh
set -ex

SECURITY_GROUP="sg-0fa8fa859b896cfa3"
IP=`curl -f -s ifconfig.me`

aws ec2 authorize-security-group-ingress --group-id ${SECURITY_GROUP} --protocol tcp --port 22 --cidr ${IP}/32
ssh -o StrictHostKeyChecking=no ${USER_NAME}@${HOST_NAME} 
ssh "cd Portfolio && git pull origin main"
aws ec2 revoke-security-group-ingress --group-id ${SECURITY_GROUP} --protocol tcp --port 22 --cidr ${IP}/32