import { GetObjectCommand, CopyObjectCommand, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
export const handleOpenObject = async (s3Client, bucketName, id) => {
  const doc_key = id.split("/").slice(3).join('/');
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: doc_key,
  });

  try {
    const response = await s3Client.send(command);

    // Obtén el tipo MIME del archivo desde los metadatos (si está disponible)
    const contentType = response.ContentType || 'application/octet-stream';

    const stream = response.Body.getReader();
    const chunks = [];
    let totalLength = 0;

    while (true) {
      const { done, value } = await stream.read();
      if (done) break;
      chunks.push(value);
      totalLength += value.length;
    }

    // Combina los chunks en un solo Uint8Array
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    // Crea un Blob con el tipo MIME adecuado
    const blob = new Blob([combined], { type: contentType });
    const url = URL.createObjectURL(blob);

    // Abre el archivo en una nueva ventana/pestaña
    window.open(url, '_blank');
  } catch (error) {
    console.error('Error abriendo el objeto:', error);
  }
};


export const copyOnPublic = async (s3Client, bucketName, pathArr) => {
  let sourceFile = pathArr.join('/');
  pathArr.splice(2, 0, "public")
  const destionationPath = pathArr.join("/")
    try {
        const copyParams = {
            Bucket: bucketName,
            CopySource: `${bucketName}/${sourceFile}`,
            Key: destionationPath,
        };
        await s3Client.send(new CopyObjectCommand(copyParams));
  
        return true
    } catch (error) {
        console.log(error)
    }
}


export const uploadToPublic = async (s3Client, bucketName, pathArr, copy) => {
  if(copy){
    copyOnPublic(s3Client, bucketName, pathArr)
  }else{
    pathArr.splice(2, 0, "public")
    const fileOnPublicPath = pathArr.join("/")
    
    const deleteParams = {
      Bucket: bucketName,
      Key: fileOnPublicPath,
    };
    try {
      await s3Client.send(new DeleteObjectCommand(deleteParams));
      
    } catch (error) {
      throw error
    }
  }
}


export const uploadFile = async (s3Client, bucketName, urlPath, file) =>{
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: urlPath,
    Body: file,
    ContentType: file.type,
  });

  try {
    const uploadImageResult = await s3Client.send(command);
  } catch (error) {
    console.error(error)
  }
}

export const deleteFile = async (s3Client, bucketName, urlPath) =>{
  try {
    const deleteParams = {
        Bucket: bucketName,
        Key: urlPath,
    };
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    return { status: 'success', msg: 'Borrado exitoso', urlPath };
} catch (error) {
    return { status: 'error', msg: 'Error al borrar el archivo', urlPath: null };
}
}