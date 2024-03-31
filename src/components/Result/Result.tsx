import { useEffect, useState } from "react";
import { assessedAttributes, assessedAtrMeasures } from "../../constants/assessedAtributes";
import { useAppSelector } from "../../hooks/hooks";
import { calculateIndicators } from "../../utils/calculateIndicators";
import './result.css';

export function Result() {
    const prodAtrMatrix = useAppSelector((state) => state.prodAtr.atrMatrix)
    const hwAtrMatrix = useAppSelector((state) => state.hwAtr.atrMatrix)
    const persAtrMatrix = useAppSelector((state) => state.persAtr.atrMatrix)
    const projAtrMatrix = useAppSelector((state) => state.projAtr.atrMatrix)
    const kloc = useAppSelector((state) => state.kloc.kloc)
    const projectMode = useAppSelector((state) => state.projectMode.projectMode)

    const [resultSignificatives, setResultSignificatives] = useState<number[]>()

    useEffect(() => {
        const result = calculateIndicators(prodAtrMatrix, hwAtrMatrix, persAtrMatrix, projAtrMatrix, Number(kloc), projectMode)
        setResultSignificatives(result)
    }, [prodAtrMatrix, hwAtrMatrix, persAtrMatrix, projAtrMatrix, kloc, projectMode])

    return(
        <>
            <div className="assessed-atr-matrix">
                {assessedAttributes.map((attribute, index) => (
                    <div className="assessed-atr-matrix-indicator-item" key={`assessed-atr-matrix-indicator-${index}`}>
                        <p> {attribute} </p>
                        <p> ({assessedAtrMeasures[index]}) </p>
                    </div>
                ))}
                {(resultSignificatives)&&(
                    resultSignificatives.map((resultSignificative, index) => (
                        <div className="assessed-atr-matrix-item" key={`assessed-atr-matrix-${index}`}>
                            <p> {resultSignificative} </p>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}