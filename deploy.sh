#!/bin/sh
set -ex

SECURITY_GROUP_NAME="ec2-circleci"
IP=`curl -f -s ifconfig.me`

aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 22 --cidr ${IP}/32
ssh "cd Portfolio && git pull origin main"
aws ec2 revoke-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 22 --cidr ${IP}/32