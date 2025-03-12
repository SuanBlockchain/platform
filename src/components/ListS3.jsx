import React, { useState, useEffect } from "react"
import { Storage } from "aws-amplify"

const ListS3 = () => {
    const [s3Objects, setS3Objects] = useState({})
    const [selectedFolder, setSelectedFolder] = useState({})
    const [currentPath, setCurrentPath] = useState([])
    useEffect(() => {
        listObjectsInFolder('Ubicaciones')
          .then((data) => {
            setS3Objects(data)
            setSelectedFolder(data)
                  })
          .catch((error) => {
            console.error("Error al listar objetos:", error)
          })
      }, [])

    async function listObjectsInFolder(folder) {
        try {
            const objects = await Storage.list(folder, { pageSize: 1000 })
            let nestedStorage = processStorageList(objects)
            return nestedStorage
        } catch (error) {
            console.error("Error al listar objetos:", error)
            throw error
        }
    }

    function processStorageList(response) {
        const filesystem = {}
        const add = (source, target, item) => {
          const elements = source.split('/')
          const element = elements.shift()
          if (!element) return 
          if (elements.length === 0) {
            target[element] = { type: 'file', ...item }
          } else {
            target[element] = target[element] || { type: 'folder', data: {} }
            add(elements.join('/'), target[element].data, item)
          }
        }
        response.results.forEach((item) => add(item.key, filesystem, item))
        return filesystem
    }

    const arrayselectedFolder = Object.keys(selectedFolder)

    const handleClickSelect = (propertyName) => {
        const selectedItem = selectedFolder[propertyName]
        if (selectedItem.type === 'folder') {
            setSelectedFolder(selectedFolder[propertyName].data)
            setCurrentPath([...currentPath, propertyName])
        } else if (selectedItem.type === 'file') {
            handleDownload(selectedItem.key)
        }
    }
    const handleClick = (object ,propertyName) => {
    const selectedItem = object[propertyName]
    if (selectedItem.type === 'folder') {
        return object[propertyName].data
    } else if (selectedItem.type === 'file') {
        console.log(`Archivo ${propertyName}:`, selectedItem)

    }
}
    const backToFolder = () => {
        const goBackArray = currentPath.slice(0,-1)
        let tempState = s3Objects
        let aux = null
        for(let i = 0; i < goBackArray.length; i++){

            aux = handleClick(tempState, goBackArray[i])
            tempState = aux
        }

        setCurrentPath(goBackArray)
        setSelectedFolder(tempState)

    }
    const backToAnyFolder = (path) => {
        const pathToBack = path

        const index = currentPath.indexOf(pathToBack)
        if (index !== -1) {
        const goBackArray = currentPath.slice(0, index + 1)
        let tempState = s3Objects
        let aux = null
        for(let i = 0; i < goBackArray.length; i++){
            
            aux = handleClick(tempState, goBackArray[i])
            tempState = aux
        }
        
        setCurrentPath(goBackArray)
        setSelectedFolder(tempState)
        }

    }
    const handleDownload = async (doc) => {
        try {
        let id = doc
        const response = await Storage.get(id, { download: true });
        const url = URL.createObjectURL(response.Body);
        const link = document.createElement('a');
        link.href = url;
        link.download = id;
        link.click();
        } catch (error) {
        console.log('Error al descargar el archivo:', error);
        }
    };
    return (
        <div>
            <h2>S3</h2>
            <div>Current path : {currentPath.map(path => <button key={path} onClick={() => backToAnyFolder(path)} style={{all:'unset', cursor:'pointer'}}>{path}/</button>)}</div>
            <button onClick={() =>backToFolder() }>Volver</button>
            <ul>
                {arrayselectedFolder.map((propertyName, index) => (
                    <li key={index} onClick={() => handleClickSelect(propertyName)} style={{ cursor: 'pointer' }}>
                        {propertyName} : {selectedFolder[propertyName].type}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListS3
