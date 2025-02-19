#!/bin/bash

# 有効期限
EXPIRATION=365 # 1年
# TLSを有効にするホスト名をカンマ区切りで指定
AKANE_HOSTS=local.akane.yaken.org

cd docker/nginx/certs

openssl req -new -x509 -noenc -subj '/C=JP/CN=Yaken Akane Private CA' -days $EXPIRATION -out akane-local-ca.crt -keyout akane-local-ca.key

for host in ${AKANE_HOSTS//,/ }; do
    openssl req -new -noenc -subj "/C=JP/CN=$host" -addext "subjectAltName = DNS:$host" -out "$host.csr" -keyout "$host.key"
    openssl x509 -req -in "$host.csr" -CA akane-local-ca.crt -CAkey akane-local-ca.key -copy_extensions copy -days $EXPIRATION -out "$host.crt"
    echo "Created certificate for $host."
done
