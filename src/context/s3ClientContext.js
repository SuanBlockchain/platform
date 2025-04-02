import React, {  useEffect, useState, useContext } from "react";
import { S3Client } from "@aws-sdk/client-s3";
import { Auth } from "aws-amplify";
import awsconfig from '../aws-exports'
const S3ClientContext = React.createContext();

export function useS3Client() {
    return useContext(S3ClientContext);
  }
export function S3ClientProvider({ children }) {
    const [s3Client, setS3Client] = useState(null)
    const bucketName = awsconfig.aws_user_files_s3_bucket
  useEffect(() => {
    initializeS3Client()
  }, []);
  const initializeS3Client = async () => {
    try {
      const credentials = await Auth.currentCredentials();
      const s3Client = new S3Client({
        region: 'us-east-1',
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken,
        },
      });
      setS3Client(s3Client)
    } catch (error) {
      console.error("Error al inicializar el cliente S3:", error);
    }
  }
  const value = {
    s3Client,
    bucketName
  };
  return <S3ClientContext.Provider value={value}>{children}</S3ClientContext.Provider>;
}
