#!/bin/bash

# 有効期限
EXPIRATION=365 # 1年
# TLSを有効にするホスト名をカンマ区切りで指定
AKANE_HOSTS=local.akane.yaken.org,admin.local.akane.yaken.org

cd docker/nginx/certs

if [[ ! -e akane-local-ca.crt ]]; then
    echo "Creating private CA..."
    openssl req -new -x509 -noenc -subj '/C=JP/CN=Yaken Akane Private CA' -days $EXPIRATION -out akane-local-ca.crt -keyout akane-local-ca.key
    echo "[OK] Created private CA."
else
    echo "[INFO] Private CA already exists."
fi

for host in ${AKANE_HOSTS//,/ }; do
    if [[ ! -e "$host.crt" ]]; then
        openssl req -new -noenc -subj "/C=JP/CN=$host" -addext "subjectAltName = DNS:$host" -out "$host.csr" -keyout "$host.key"
        openssl x509 -req -in "$host.csr" -CA akane-local-ca.crt -CAkey akane-local-ca.key -copy_extensions copy -days $EXPIRATION -out "$host.crt"
        echo "[OK] Created certificate for $host."
        continue
    else
        echo "[INFO] Certificate for $host already exists."
    fi
done
