#!/bin/sh
set -ex

SECURITY_GROUP_NAME="ec2-circleci"
IP=`curl -f -s ifconfig.me`

trap "aws ec2 revoke-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 22 --cidr ${IP}/32" 0 1 2 3 15
aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 22 --cidr ${IP}/32
bundle exec cap prod deploy