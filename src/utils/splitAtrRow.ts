export function splitAtrRow(atrRow: (string | undefined)[]) {
    let resultString = '('
    if (atrRow) {
        if (atrRow.length === 1) {
            resultString = resultString.concat(atrRow[0]!)
        }
        else {
            for (let i = 0; i < atrRow.length; i++) {
                resultString = resultString.concat(atrRow[i]!)
                if (i !== atrRow.length - 1) {
                    resultString = resultString.concat(', ')
                }
            }
        }
        resultString = resultString.concat(')')
    }
    else {
        return ['-']
    }

    return customSplitStr(resultString.toLocaleLowerCase(), ' ', 75)
}

function customSplitStr(str: string, symbol: string, chunkSize: number) {
    const result: string[] = []
    let wordsArray = str.split(symbol)
    console.log(wordsArray)
    let currentRow = ''
    for (let i = 0; i < wordsArray.length; i++) {
        let rowPart = currentRow.concat(wordsArray[i])
        console.log(rowPart)
        if(rowPart.length > chunkSize) {
            result.push(currentRow)
            i--
            currentRow = ''
        }
        else {
            currentRow = currentRow.concat(wordsArray[i]).concat(' ')
        }
        if (i === wordsArray.length - 1) {
            result.push(currentRow)
        }
    }
    console.log(result)
    return result
}