import { coefficients } from "../constants/coefficients";
import { attributesMatrix } from "../constants/attributeMatrix";
import { ProjectModesList } from "../constants/projectModes";

function multEffByMatrAtr(resAtrMatrix: (number | undefined)[][], effort: number): number {
    let finalEffort = effort
    console.log(resAtrMatrix)
    for (let i = 0; i < resAtrMatrix.length; i++) {
        for (let j = 0; j < resAtrMatrix[i].length; j++) {
            if (resAtrMatrix[i][j] === 1) {
                finalEffort *= attributesMatrix[i][j]!
            }
        }
    }
    return finalEffort
}

export function calculateIndicators(
    resProdAtrMatrix: (number | undefined)[][],
    resHwAtrMatrix: (number | undefined)[][],
    resPersAtrMatrix: (number | undefined)[][],
    resProjAtrMatrix: (number | undefined)[][],
    kloc: number,
    projectMode: ProjectModesList
) {
    let effort = Math.round((coefficients[projectMode].a * Math.pow(kloc, coefficients[projectMode].b)) * 100) / 100
    let developmentTime = Math.round((coefficients[projectMode].c * Math.pow(effort, coefficients[projectMode].d)) * 100) / 100
    let averageStaffSize = Math.round((effort / developmentTime) * 100) / 100

    let resAtrMatrix = resProdAtrMatrix.concat(resHwAtrMatrix).concat(resPersAtrMatrix).concat(resProjAtrMatrix)
    effort = Math.round((multEffByMatrAtr(resAtrMatrix, effort)) * 100) / 100

    return [effort, developmentTime, averageStaffSize]
}
