export function sortMatrixByFactors(atrMatrix: (number | undefined)[][], attributesNames: string[]): (string | undefined)[][] {
    let result: (string | undefined)[][] = []
    for (let i = 0; i < atrMatrix.length; i++) {
        for (let j = 0; j < atrMatrix[i].length; j++) {
            if (atrMatrix[i][j] === 1) {
                if (!result[j]) {
                    result[j] = []
                }
                (result[j]).push(attributesNames[i])
            }
        }
    }
    return result
}