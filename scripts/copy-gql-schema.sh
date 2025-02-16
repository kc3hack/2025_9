#!/bin/sh

TYPEDEFS_PATH="packages/akane-next/src/graphql/typedefs.ts"
SCHEMA_PATH="packages/akane-next/schema"

COMMENT="// このファイルは ./scripts/copy-gql-schema.sh で生成しています。直接編集しないでください。"
CONTENT="export const typeDefs = \"$(cat ${SCHEMA_PATH}/*.gql)\";"

echo $COMMENT > $TYPEDEFS_PATH
echo $CONTENT >> $TYPEDEFS_PATH
