import { CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
const { Storage } = require("aws-amplify");

export async function moveToBackupFolderS3(s3Client, bucketName, sourceKey) {
  const file = sourceKey.split('/').pop();
  const destinationFile = sourceKey.split('/').slice(0,3).join('/') + '/backup/' + file
  try {
      const copyParams = {
          Bucket: bucketName,
          CopySource: `${bucketName}/${sourceKey}`,
          Key: destinationFile,
      };
      
      await s3Client.send(new CopyObjectCommand(copyParams));

      return true
  } catch (error) {
      console.log(error)
      throw error
  }
}

/* export async function removeFolderS3(path) {
  try {
    const list = await Storage.list(path);
    console.log(list,"list")
    await Promise.all(
      list.results.map(async (item) => {
        console.log(item,"item")
        await Storage.remove(item.key);
      })
    );
  } catch (error) {
    console.error("Error removing the folder:", error);
  }
}
 */



export async function moveFile(s3Client, bucketName, sourceFile, destinationFolder, currentPath) {
  const fileName = sourceFile.key
  const sourceFilePath = `projects/${currentPath.join('/')}/${fileName}`;
  const destinationFile = `projects/${currentPath.slice(0, 2).join("/")}/${destinationFolder}/${fileName}`;
  try {
      const copyParams = {
          Bucket: bucketName,
          CopySource: `${bucketName}/${sourceFilePath}`,
          Key: destinationFile,
      };
      
      await s3Client.send(new CopyObjectCommand(copyParams));

      const deleteParams = {
          Bucket: bucketName,
          Key: sourceFilePath,
      };
      
      await s3Client.send(new DeleteObjectCommand(deleteParams));
      return { status: 'success', msg: 'Borrado exitoso', sourceFilePath };
  } catch (error) {
      return { status: 'error', msg: 'Error al borrar el archivo', sourceFilePath: null };
  }
      /* return { status: 'error', msg: 'testing', sourceFilePath }; */
}

export async function removeFolderS3(s3Client, bucketName, currentPath, folderToDelete) {
  const currentPathJoin = 'projects/' + currentPath.join('/');

  try {
    // List objects in the specified folder
    const listParams = {
      Bucket: bucketName,
      Prefix: currentPathJoin + `/${folderToDelete}`,
    };

    const listCommand = new ListObjectsV2Command(listParams);
    const listResponse = await s3Client.send(listCommand);
    

    if (listResponse.Contents && listResponse.Contents.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: listResponse.Contents.map(item => ({ Key: item.Key })),
        },
      };

      const deleteCommand = new DeleteObjectsCommand(deleteParams);
      const deleteResponse = await s3Client.send(deleteCommand);
      
      if (deleteResponse.Errors && deleteResponse.Errors.length > 0) {
        console.error("Error removing folder:", deleteResponse.Errors);
        return { status: 'error', msg: `Error al eliminar la carpeta ${folderToDelete}` };
      }

      return { status: 'success', msg: 'Carpeta eliminada' };
    } else {
      return { status: 'error', msg: 'No se encontraron objetos en la carpeta especificada.' };
    }
  } catch (error) {
    return { status: 'error', msg: `Error al eliminar la carpeta ${folderToDelete}: ${error.message}` };
  }
}
