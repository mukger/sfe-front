import jsPDF from "jspdf";
import { ProjectModesList } from "../constants/projectModes";
import { sortMatrixByFactors } from "./sortMatrixByFactors";
import { productAttributes, hardwareAttributes, personnelAttributes, projectAttributes } from "../constants/attributes";
import { attributeIndicators } from "../constants/attributeIndicators";
import { splitAtrRow } from "./splitAtrRow";
import { calculateIndicators } from "./calculateIndicators";
import { assessedAttributes, assessedAtrMeasures } from "../constants/assessedAtributes";

class GeneratePdfResultInput {
    projectMode: ProjectModesList
    kloc: string
    prodAtrMatrix: (number | undefined)[][]
    hwAtrMatrix: (number | undefined)[][]
    persAtrMatrix: (number | undefined)[][]
    projAtrMatrix: (number | undefined)[][]
}

export function generatePdfResult(inputData: GeneratePdfResultInput) {
    const { prodAtrMatrix, hwAtrMatrix, persAtrMatrix, projAtrMatrix, projectMode, kloc } = inputData
    const doc = new jsPDF()
    doc.setFont('times', 'italic')
    doc.setFontSize(18)
    doc.text("Result of MukgerCCM service calculations", 50, 10);
    doc.line(0, 12, 500, 12, 'S')

    doc.setFontSize(15)
    doc.setFont('times', 'normal')

    doc.setFont('times', 'bold')
    doc.text('Input data:', 10, 25)

    doc.setFont('times', 'normal')
    doc.text(`Project type: ${projectMode}`, 10, 35);
    doc.text(`Amount lines of code: ${Number(kloc) * 1000}`, 10, 45);

    doc.setFont('times', 'italic')
    doc.text('Product characteristics sorted by chosen rating:', 10, 60)
    doc.setFont('times', 'normal')
    let startHeight = 68;
    let sortedMatrix = sortMatrixByFactors(prodAtrMatrix, productAttributes)
    for (let i = 0; i < attributeIndicators.length; i++) {
        for(let j = 0; j < splitAtrRow(sortedMatrix[i]).length; j++) {
            if (j === 0) {
                doc.text(`${attributeIndicators[i]} rating: ${splitAtrRow(sortedMatrix[i])[j]}`, 10, startHeight)
            }
            else {
                doc.text(`${splitAtrRow(sortedMatrix[i])[j]}`, 10, startHeight)
            }
            startHeight += 8
        }
    }
    startHeight += 10

    doc.setFont('times', 'italic')
    doc.text('Hardware characteristics sorted by chosen rating:', 10, startHeight)
    doc.setFont('times', 'normal')
    startHeight += 8
    sortedMatrix = sortMatrixByFactors(hwAtrMatrix, hardwareAttributes)
    for (let i = 0; i < attributeIndicators.length; i++) {
        for(let j = 0; j < splitAtrRow(sortedMatrix[i]).length; j++) {
            if (j === 0) {
                doc.text(`${attributeIndicators[i]} rating: ${splitAtrRow(sortedMatrix[i])[j]}`, 10, startHeight)
            }
            else {
                doc.text(`${splitAtrRow(sortedMatrix[i])[j]}`, 10, startHeight)
            }
            startHeight += 8
        }
    }
    startHeight += 10

    doc.setFont('times', 'italic')
    doc.text('Personnel characteristics sorted by chosen rating:', 10, startHeight)
    doc.setFont('times', 'normal')
    startHeight += 8
    sortedMatrix = sortMatrixByFactors(persAtrMatrix, personnelAttributes)
    for (let i = 0; i < attributeIndicators.length; i++) {
        for(let j = 0; j < splitAtrRow(sortedMatrix[i]).length; j++) {
            if (j === 0) {
                doc.text(`${attributeIndicators[i]} rating: ${splitAtrRow(sortedMatrix[i])[j]}`, 10, startHeight)
            }
            else {
                doc.text(`${splitAtrRow(sortedMatrix[i])[j]}`, 10, startHeight)
            }
            startHeight += 8
        }
    }
    startHeight += 10

    doc.addPage()
    startHeight = 10

    doc.setFont('times', 'italic')
    doc.text('Project characteristics sorted by chosen rating:', 10, startHeight)
    doc.setFont('times', 'normal')
    startHeight += 8
    sortedMatrix = sortMatrixByFactors(projAtrMatrix, projectAttributes)
    for (let i = 0; i < attributeIndicators.length; i++) {
        for(let j = 0; j < splitAtrRow(sortedMatrix[i]).length; j++) {
            if (j === 0) {
                doc.text(`${attributeIndicators[i]} rating: ${splitAtrRow(sortedMatrix[i])[j]}`, 10, startHeight)
            }
            else {
                doc.text(`${splitAtrRow(sortedMatrix[i])[j]}`, 10, startHeight)
            }
            startHeight += 8
        }
    }

    startHeight += 20
    doc.setFont('times', 'bold')
    doc.text('Output data:', 10, startHeight)
    doc.setFont('times', 'italic')
    startHeight += 10
    const result = calculateIndicators(prodAtrMatrix, hwAtrMatrix, persAtrMatrix, projAtrMatrix, Number(kloc), projectMode)
    for (let i = 0; i < result.length; i++) {
        doc.text(`${assessedAttributes[i]} (${assessedAtrMeasures[i]}): ${result[i]}`, 10, startHeight)
        startHeight += 10
    }
    
    const pdfOutput = doc.output();
    const blob = new Blob([pdfOutput], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.pdf';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}