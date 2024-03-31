export async function formatImport(data: any) {
    let resultData = data
    for (let i = 0; i < resultData.prodAtrMatrix.length; i++) {
        for (let j = 0; j < resultData.prodAtrMatrix[i].length; j++) {
            if (!resultData.prodAtrMatrix[i][j] && resultData.prodAtrMatrix[i][j] !== 0) { resultData.prodAtrMatrix[i][j] = undefined }
        }
    }
    for (let i = 0; i < resultData.hwAtrMatrix.length; i++) {
        for (let j = 0; j < resultData.hwAtrMatrix[i].length; j++) {
            if (!resultData.hwAtrMatrix[i][j] && resultData.hwAtrMatrix[i][j] !== 0) { resultData.hwAtrMatrix[i][j] = undefined }
        }
    }
    for (let i = 0; i < resultData.persAtrMatrix.length; i++) {
        for (let j = 0; j < resultData.persAtrMatrix[i].length; j++) {
            if (!resultData.persAtrMatrix[i][j] && resultData.persAtrMatrix[i][j] !== 0) { resultData.persAtrMatrix[i][j] = undefined }
        }
    }
    for (let i = 0; i < resultData.projAtrMatrix.length; i++) {
        for (let j = 0; j < resultData.projAtrMatrix[i].length; j++) {
            if (!resultData.projAtrMatrix[i][j] && resultData.projAtrMatrix[i][j] !== 0) { resultData.projAtrMatrix[i][j] = undefined }
        }
    }

    return resultData
}

export function formatExport(data: any) {
    let resultData = data
    for (let i = 0; i < resultData.length; i++) {
        for (let j = 0; j < resultData[i].length; j++) {
            if (!resultData[i][j] && resultData[i][j] !== 0) { resultData[i][j] = undefined }
        }
    }
    return data
}