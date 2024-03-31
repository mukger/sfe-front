import { AttributeAreasList, hardwareAttributes, personnelAttributes, productAttributes, projectAttributes } from '../../constants/attributes';
import { attributeIndicators } from '../../constants/attributeIndicators';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setProdAtr } from '../../store/adtProdAtrReducer';
import { setHwAtr } from '../../store/adtHwAtrReducer';
import { setPersAtr } from '../../store/adtPersAtrReducer';
import { setProjAtr } from '../../store/adtProjAtrReducer';
import { AdditionalAttributesAreas } from './AdditionalAttributesAreas/AdtAtrAreas';
import './additionalAttributes.css'
import { additionalAttributesProps } from './additionalAttributesProps';

export function AdditionalAttributes(props: additionalAttributesProps) {

    const dispatch = useAppDispatch()
    const prodAtrMatrix = useAppSelector((state) => state.prodAtr.atrMatrix)
    const hwAtrMatrix = useAppSelector((state) => state.hwAtr.atrMatrix)
    const persAtrMatrix = useAppSelector((state) => state.persAtr.atrMatrix)
    const projAtrMatrix = useAppSelector((state) => state.projAtr.atrMatrix)

    const [choosenAtr, setChoosenAtr] = useState<AttributeAreasList>(AttributeAreasList.PROD_ATR)

    const { choosable } = props

    const handleProdAtrMatrix = (newProdAtrMatrix: (number | undefined)[][]) => {
        dispatch(setProdAtr(newProdAtrMatrix));
    };

    const handleHwAtrMatrix = (newHwAtrMatrix: (number | undefined)[][]) => {
        dispatch(setHwAtr(newHwAtrMatrix))
    }

    const handlePersAtrMatrix = (newPersAtrMatrix: (number | undefined)[][]) => {
        dispatch(setPersAtr(newPersAtrMatrix))
    }

    const handleProjAtrMatrix = (newProjAtrMatrix: (number | undefined)[][]) => {
        dispatch(setProjAtr(newProjAtrMatrix))
    }

    function getCurrentUserMatrix() {
        switch(choosenAtr) {
            case AttributeAreasList.PROD_ATR:
                return prodAtrMatrix;
            case AttributeAreasList.HW_ATR:
                return hwAtrMatrix;
            case AttributeAreasList.PERS_ATR:
                return persAtrMatrix;
            case AttributeAreasList.PROJ_ATR:
                return projAtrMatrix;
        }
    }

    function getCurrentAtrNames() {
        switch(choosenAtr) {
            case AttributeAreasList.PROD_ATR:
                return productAttributes;
            case AttributeAreasList.HW_ATR:
                return hardwareAttributes;
            case AttributeAreasList.PERS_ATR:
                return personnelAttributes;
            case AttributeAreasList.PROJ_ATR:
                return projectAttributes;
        }
    }

    function setRowAtrValues(someAtrMatrix: (number | undefined)[][], rowIndex: number) {
        const newMatrix: (number | undefined)[][] = someAtrMatrix.map(row => [...row]);
        for(let i = 0; i < newMatrix[rowIndex].length; i++) {
            if(newMatrix[rowIndex][i] !== undefined) {
                newMatrix[rowIndex][i] = 0
            }
        }
        return newMatrix
    }

    function changeAtrMatrix(rowIndex: number, colIndex: number) {
        let newMatrix: (number | undefined)[][];
        switch(choosenAtr) {
            case AttributeAreasList.PROD_ATR:
                if (prodAtrMatrix[rowIndex][colIndex] === undefined) {
                    return
                }
                newMatrix = setRowAtrValues(prodAtrMatrix, rowIndex)
                newMatrix![rowIndex][colIndex] = 1
                handleProdAtrMatrix(newMatrix)
                break;
            case AttributeAreasList.HW_ATR:
                if (hwAtrMatrix[rowIndex][colIndex] === undefined) {
                    return
                }
                newMatrix = setRowAtrValues(hwAtrMatrix, rowIndex)
                newMatrix![rowIndex][colIndex] = 1
                handleHwAtrMatrix(newMatrix)
                break;
            case AttributeAreasList.PERS_ATR:
                if (persAtrMatrix[rowIndex][colIndex] === undefined) {
                    return
                }
                newMatrix = setRowAtrValues(persAtrMatrix, rowIndex)
                newMatrix![rowIndex][colIndex] = 1
                handlePersAtrMatrix(newMatrix)
                break;
            case AttributeAreasList.PROJ_ATR:
                if (projAtrMatrix[rowIndex][colIndex] === undefined) {
                    return
                }
                newMatrix = setRowAtrValues(projAtrMatrix, rowIndex)
                newMatrix![rowIndex][colIndex] = 1
                handleProjAtrMatrix(newMatrix)
                break;
            default:
                break;
        }
    }

    return (
        <>
            Change some additional parameters:
            {(prodAtrMatrix && hwAtrMatrix && persAtrMatrix && projAtrMatrix)&&(
                <>
                    <AdditionalAttributesAreas choosenAtr={choosenAtr} setChoosenAtr={setChoosenAtr} />
                    <div className={`adt-atr-matrix`}>
                        <div className='adt-atr-matrix-item-indicator'>
                        </div>
                        {attributeIndicators.map((indicator, indexI) => {
                            return (
                                <div className='adt-atr-matrix-item-indicator' key={`atrIndicator${indexI}`}>
                                    {(indicator.split(' ')).map((indicatorItem, indexJ) => (
                                        <p key={`atrIndicatorItem${indexJ}`}>{indicatorItem}</p>
                                    ))}
                                </div>
                            )
                        })}
                        {getCurrentUserMatrix()!.map((row, rowIndex) => (
                            <React.Fragment key={`matrName${rowIndex}`}>
                                <div className={`adt-atr-matrix-item${(rowIndex === (getCurrentUserMatrix()!).length - 1)?('-last'):('')}`}>
                                    {(getCurrentAtrNames()!)[rowIndex]}
                                </div>
                                {((getCurrentUserMatrix()!)[rowIndex]).map((col, colIndex) => (
                                    <div 
                                        key={`matrAtrCell${rowIndex}${colIndex}`}
                                        className={`adt-atr-matrix-item${(rowIndex === (getCurrentUserMatrix()!).length - 1)?('-last'):('')}`}
                                        style={{
                                            color: ((getCurrentUserMatrix()!)[rowIndex][colIndex] === undefined)?('#d63447'):(
                                                ((getCurrentUserMatrix()!)[rowIndex][colIndex] !== 0)?('green'):('black')
                                            )
                                        }}
                                        onClick={() => (choosable)?(changeAtrMatrix(rowIndex, colIndex)):('')}
                                    >
                                        {(
                                            (getCurrentUserMatrix()!)[rowIndex][colIndex] !== undefined
                                        )?(
                                            ((getCurrentUserMatrix()!)[rowIndex][colIndex] !== 0)?(<p>✔</p>):('')
                                        ):(
                                            <p>✘</p>
                                        )}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}