import React, { useEffect, useState } from "react";
import './recordPage.css'
import axios from "axios";
import { formatExport} from "../../utils/formatImport";
import { useParams } from "react-router-dom";
import { ProgectMode } from "../../components/ProjectMode/ProgectMode";
import { CodeLinesInput } from "../../components/CodeLinesInput/CodeLinesInput";
import { AdditionalAttributes } from "../../components/AdditionalAttributes/AdditionalAttributes";
import { useAppDispatch } from "../../hooks/hooks";
import { resetProdAtr, setProdAtr } from "../../store/adtProdAtrReducer";
import { resetHwAtr, setHwAtr } from "../../store/adtHwAtrReducer";
import { resetPersAtr, setPersAtr } from "../../store/adtPersAtrReducer";
import { resetProjAtr, setProjAtr } from "../../store/adtProjAtrReducer";
import { resetKloc, setKloc } from "../../store/klocReducer";
import { resetProjectMode, setProjectMode } from "../../store/projectModeReducer";
import { ProjectModesList } from "../../constants/projectModes";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";

export function RecordPage() {
    let { calculationId } = useParams();
    const dispatch = useAppDispatch()

    const [founded, setFounded] = useState(true)

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

    const handleKloc = (newKloc: String) => {
        dispatch(setKloc(newKloc));
    };

    const handleProjectMode = (newProjectMode: ProjectModesList) => {
        dispatch(setProjectMode(newProjectMode));
    };

    const handleResetStates = () => {
        dispatch(resetProdAtr())
        dispatch(resetHwAtr())
        dispatch(resetPersAtr())
        dispatch(resetProjAtr())
        dispatch(resetKloc())
        dispatch(resetProjectMode())
    }

    useEffect(() => {
        axios.get(`/records/${calculationId}`).then((response) => {
            if (!response.data) {
                setFounded(!founded)
            }
            else {
                let parsedProdMatrix = formatExport(response.data.adt_atr.prodAtrMatrix as (number | undefined)[][])
                let parsedHwMatrix = formatExport(response.data.adt_atr.hwAtrMatrix as (number | undefined)[][])
                let parsedPersMatrix = formatExport(response.data.adt_atr.persAtrMatrix as (number | undefined)[][])
                let parsedProjMatrix = formatExport(response.data.adt_atr.projAtrMatrix as (number | undefined)[][])
                let kloc = response.data.kloc
                let projectMode = response.data.type
                handleProdAtrMatrix(parsedProdMatrix)
                handleHwAtrMatrix(parsedHwMatrix)
                handlePersAtrMatrix(parsedPersMatrix)
                handleProjAtrMatrix(parsedProjMatrix)
                handleKloc(kloc)
                handleProjectMode(projectMode)
            }
        })
        .catch((error) => {
            setFounded(!founded)
        });
        return () => {
            handleResetStates()
        }
    }, [])

    return(
        <>
            {(founded)?(
                <>
                    <ProgectMode choosable={false}/>
                    <br />
                    <CodeLinesInput choosable={false}/>
                    <br />
                    <AdditionalAttributes choosable={false} />
                </>
            ):(
                <NotFoundPage />
            )}
            
            
        </>
    )
}