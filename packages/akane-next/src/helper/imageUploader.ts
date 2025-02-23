import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";

// S3の設定
const accessKeyId = process.env.S3_ACCESS_KEY_ID!;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY!;
const bucketName = process.env.S3_BUCKET_NAME!;
const bucketUrl = process.env.S3_BUCKET_URL!;
const endpoint = process.env.S3_API_ENDPOINT!;

const s3Client = new S3Client({
  region: "auto",
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * 署名付きURLを生成します
 *
 * @param key - オブジェクトのキー
 * @param expiresIn - URLの有効期限
 * @returns 署名付きURL
 */
const generateSignedUrl = async (key: string, expiresIn: number) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
};

const uploadFileToSignedUrl = async (signedUrl: string, file: File) => {
  const response = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  // responseがだめそうな場合はエラーを投げる
  if (!response.ok) {
    throw new Error("Failed to upload file");
  }
  return;
};

/**
 * アップロードされたファイルをオブジェクトストレージにアップロードします
 *
 * @param file - アップロードするファイル
 * @returns アップロード先のURL
 */
export const uploadUserImage = async (file: File) => {
  // ファイル名をランダムな文字列にする
  const bucketPath = `userContent/${v4()}`;

  // 署名付きUrlを生成する
  // 有効期限は60秒
  const expiresIn = 60;
  const signedUrl = await generateSignedUrl(bucketPath, expiresIn);

  // ファイルをアップロード
  await uploadFileToSignedUrl(signedUrl, file);

  return `${bucketUrl}/${bucketPath}`;
};
