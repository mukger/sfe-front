import { useEffect, useState } from "react";
import { assessedAttributes, assessedAtrMeasures } from "../../constants/assessedAtributes";
import './historyPage.css'
import axios from "axios";
import { calculateIndicators } from "../../utils/calculateIndicators";
import { formatExport } from "../../utils/formatImport";
import { Link } from "react-router-dom";

export function HistoryPage() {
    const amountElements = 18
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [numberOfPages, setNumberOfPages] = useState<number>()
    const [records, setRecords] = useState<number[][]>()
    const [recordIds, setRecordIds] = useState<string[]>()
    useEffect(() => {
        axios.get(`/records?page=${currentPage}&scope=${amountElements}`).then((response) => {
            console.log(response.data);
            const currentArrayPage: number[][] = []
            const currentIds: string[] = []
            response.data.forEach((row: any, index: number) => {
                let parsedProdMatrix = formatExport(row.adt_atr.prodAtrMatrix as (number | undefined)[][])
                let parsedHwMatrix = formatExport(row.adt_atr.hwAtrMatrix as (number | undefined)[][])
                let parsedPersMatrix = formatExport(row.adt_atr.persAtrMatrix as (number | undefined)[][])
                let parsedProjMatrix = formatExport(row.adt_atr.projAtrMatrix as (number | undefined)[][])
                let kloc = row.kloc
                let projectMode = row.type

                currentArrayPage[index] = calculateIndicators(
                    parsedProdMatrix,
                    parsedHwMatrix,
                    parsedPersMatrix,
                    parsedProjMatrix,
                    kloc, 
                    projectMode
                )
                currentIds[index] = row.id
            })
            setRecords(currentArrayPage)
            setRecordIds(currentIds)
            setNumberOfPages(Math.ceil(response.headers['x-total-count']/amountElements))
        })
        .catch((error) => {
            console.log(error); 
        });
    }, [currentPage])

    const handleChangeCurPage = (newCurPage: number) => {
        setCurrentPage(newCurPage)
    }

    return(
        <>
            <div className="history-matrix">
                <div className="matrix-head">
                    {assessedAttributes.map((assessedAtr, index) => (
                        <div className="history-matrix-el" key={`assessed-history-matrix-${index}`}>
                            <p>{assessedAtr}</p>
                            <p>({assessedAtrMeasures[index]})</p>
                        </div>
                    ))}
                </div>
                {(records && records.length > 0 && recordIds && records!.length > 0)?(
                    records.map((record, index) => (
                        <Link to={`/calculation/${recordIds[index]}`} style={{ textDecoration: 'none', color: "black" }} key={`history-matrix-row-link-${index}`}>
                            <div className="matrix-row" key={`history-matrix-row-${index}`}>
                                <div className="history-matrix-el">
                                    <p>{record[0]}</p>
                                </div>
                                <div className="history-matrix-el">
                                    <p>{record[1]}</p>
                                </div>
                                <div className="history-matrix-el">
                                    <p>{record[2]}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ):(
                    <>
                    </>
                )}
                    
            </div>
            {(numberOfPages && numberOfPages > 1) ? (
                <div className="pagination-box">
                    {(() => {
                        const elements = []
                        for (let i = 0; i < numberOfPages; i++) {
                            elements.push(
                                <div 
                                    className={`pagination-item${(currentPage === i + 1)?('-chosen'):('')}`}
                                    onClick={() => handleChangeCurPage(i + 1)}
                                    key={`pagination-item-${i}`}
                                >
                                    <p>{i + 1}</p>
                                </div>
                            );
                        }
                        if (numberOfPages === 0) {
                            return <></>;
                        }
                        else {
                            return elements;
                        }
                    })()}
                </div>
            ):(
                <></>
            )}
        </>
    )
}