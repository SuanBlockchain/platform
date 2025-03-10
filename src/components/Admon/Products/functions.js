import { API, graphqlOperation } from "aws-amplify";
import {
  deleteProduct,
  deleteProductFeature,
  deleteImage,
  deleteUserProduct,
  deleteDocument,
  deleteVerification,
  deleteCampaign,
  deleteProperty,
  deleteOrder,
  deletePayment,
  deleteTransactions,
  deleteToken,
} from "../../../graphql/mutations";
import { Auth } from "aws-amplify";


import { Storage } from "aws-amplify";
import { getProduct } from "graphql/queries";
import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: async () => {
    const credentials = await Auth.currentCredentials();
    return Auth.essentialCredentials(credentials);
  },
});

export async function deleteAllInfoProduct(product) {
  if (!product) {
    return;
  }

  const promises = [];

  try {
    // 1. Eliminar la carpeta del proyecto en S3
    if (product.id) {
      await deleteFolderFromS3(`projects/${product.id}/`);
    }

    // 2. Obtener información completa del producto
    const { data } = await API.graphql(
      graphqlOperation(getProduct, { id: product.id })
    );
    const productData = data?.getProduct;
    // 3. Manejar campañas
    const campaign = productData?.campaign;
    if (campaign) {

      const propertyPromises = campaign.properties.items?.map((property) => {
        return API.graphql(
          graphqlOperation(deleteProperty, { input: { id: property.id } })
        );
      });

      if (propertyPromises) {
        promises.push(...propertyPromises);
      }

      await deleteFolderFromS3(`public/campaign/${campaign.id}-campaign/`);

      promises.push(
        API.graphql(
          graphqlOperation(deleteCampaign, { input: { id: campaign.id } })
        )
      );
    }

    const propertyPromises = productData?.properties?.items?.map((property) => {
      return API.graphql(
        graphqlOperation(deleteProperty, { input: { id: property.id } })
      );
    });

    if (propertyPromises) {
      promises.push(...propertyPromises);
    }

    // 4. Eliminar órdenes asociadas
    if (productData?.orders?.items) {
      productData.orders.items.forEach((order) => {
        promises.push(API.graphql(graphqlOperation(deleteOrder, { input: { id: order.id } })));
      });
    }

    // 5. Eliminar pagos asociados
    if (productData?.payments?.items) {
      productData.payments.items.forEach((payment) => {
        promises.push(API.graphql(graphqlOperation(deletePayment, { input: { id: payment.id } })));
      });
    }

    // 6. Eliminar transacciones asociadas
    if (productData?.transactions?.items) {
      productData.transactions.items.forEach((transaction) => {
        promises.push(API.graphql(graphqlOperation(deleteTransactions, { input: { id: transaction.id } })));
      });
    }

    // 7. Eliminar tokens asociados
    if (productData?.tokens?.items) {
      productData.tokens.items.forEach((token) => {
        promises.push(API.graphql(graphqlOperation(deleteToken, { input: { id: token.id } })));
      });
    }

    // 8. Eliminar imágenes asociadas
    const imagePromises = productData?.images?.items?.map((image) => {
      return API.graphql(graphqlOperation(deleteImage, { input: { id: image.id } }));
    });
    if (imagePromises) {
      promises.push(...imagePromises);
    }

    // 9. Eliminar características del producto
    const productFeaturePromises = productData?.productFeatures?.items?.map((pf) => {

      // Eliminar documentos asociados a las características
      pf.documents?.items?.forEach((doc) => {
        API.graphql(graphqlOperation(deleteDocument, { input: { id: doc.id } }));
      });

      // Eliminar verificaciones asociadas
      pf.verifications?.items?.forEach((verification) => {
        API.graphql(
          graphqlOperation(deleteVerification, { input: { id: verification.id } })
        );
      });

      return API.graphql(
        graphqlOperation(deleteProductFeature, { input: { id: pf.id } })
      );
    });
    if (productFeaturePromises) {
      promises.push(...productFeaturePromises);
    }

    // 10. Eliminar asociaciones de usuarios con el producto
    const userProductPromises = productData?.userProducts?.items?.map((up) => {
      return API.graphql(graphqlOperation(deleteUserProduct, { input: { id: up.id } }));
    });
    if (userProductPromises) {
      promises.push(...userProductPromises);
    }

    // 11. Eliminar el producto de la base de datos
    promises.push(
      API.graphql(graphqlOperation(deleteProduct, { input: { id: product.id } }))
    );

    // Ejecutar todas las promesas
    await Promise.all(promises);
  } catch (error) {
    console.error("Error al eliminar la información del producto:", error);
  }
}

async function deleteFolderFromS3(folderPath) {
  const bucketName = "platformd9531187bef34a10abb664f2878180ae00db6-internal"; // Tu bucket

  try {
    let continuationToken = null; // Token para manejar múltiples iteraciones
    let filesDeleted = 0; // Contador de archivos eliminados

    // Eliminar todos los objetos dentro del prefijo
    do {
      const listParams = {
        Bucket: bucketName,
        Prefix: folderPath,
        ContinuationToken: continuationToken,
      };

      const listResponse = await s3Client.send(new ListObjectsV2Command(listParams));
      const fileKeys = listResponse.Contents?.map((file) => ({ Key: file.Key })) || [];

      if (fileKeys.length === 0) break; // Si no hay archivos, detener el bucle

      // Eliminar los objetos listados
      const deleteParams = {
        Bucket: bucketName,
        Delete: { Objects: fileKeys },
      };

      const deleteResponse = await s3Client.send(new DeleteObjectsCommand(deleteParams));
      filesDeleted += deleteResponse.Deleted?.length || 0;

      continuationToken = listResponse.NextContinuationToken; // Continuar con la siguiente página
    } while (continuationToken);

    // Intentar eliminar explícitamente el marcador de carpeta vacío
    await s3Client.send(
      new DeleteObjectsCommand({
        Bucket: bucketName,
        Delete: { Objects: [{ Key: folderPath }] },
      })
    );

    console.info(`Se eliminaron ${filesDeleted} archivos y la carpeta '${folderPath}'.`);
  } catch (error) {
    if (error.name === "AccessDenied") {
      console.error(
        `Permiso denegado al intentar eliminar '${folderPath}'. Revisa las políticas del bucket.`
      );
    } else {
      console.error(`Error general al eliminar la carpeta '${folderPath}':`, error);
    }
  }
}


