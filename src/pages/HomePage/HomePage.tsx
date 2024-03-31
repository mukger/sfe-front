import './homePage.css';
import { ProgectMode } from "../../components/ProjectMode/ProgectMode";
import { CodeLinesInput } from '../../components/CodeLinesInput/CodeLinesInput';
import { AdditionalAttributes } from '../../components/AdditionalAttributes/AdditionalAttributes';
import { ResultButton } from '../../components/CustomButtons/ResultButton/ResultButton';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setResultControl } from '../../store/controlReducer';
import { Result } from '../../components/Result/Result';
import { resetProdAtr } from '../../store/adtProdAtrReducer';
import { resetHwAtr } from '../../store/adtHwAtrReducer';
import { resetPersAtr } from '../../store/adtPersAtrReducer';
import { resetProjAtr } from '../../store/adtProjAtrReducer';
import { resetProjectMode } from '../../store/projectModeReducer';
import { resetKloc } from '../../store/klocReducer';
import axios from 'axios';
import { useEffect } from 'react';
import { DefaultButton } from '../../components/CustomButtons/DefaultButton/DefaultButton';
 
export function HomePage() {
    const dispatch = useAppDispatch()
    const checkResult = useAppSelector((state) => state.control.control.result)
    const prodAtrMatrix = useAppSelector((state) => state.prodAtr.atrMatrix)
    const hwAtrMatrix = useAppSelector((state) => state.hwAtr.atrMatrix)
    const persAtrMatrix = useAppSelector((state) => state.persAtr.atrMatrix)
    const projAtrMatrix = useAppSelector((state) => state.projAtr.atrMatrix)
    const kloc = useAppSelector((state) => state.kloc.kloc)
    const projectMode = useAppSelector((state) => state.projectMode.projectMode)

    const handleCheckResult = () => {
        axios.post('/records', {
            kloc: Number(kloc),
            type: projectMode,
            adtAtr: {
                prodAtrMatrix,
                hwAtrMatrix,
                persAtrMatrix,
                projAtrMatrix
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        dispatch(setResultControl(!checkResult));
    };

    const handleCheckTryAgain = () => {
        dispatch(setResultControl(!checkResult));
        dispatch(resetProdAtr())
        dispatch(resetHwAtr())
        dispatch(resetPersAtr())
        dispatch(resetProjAtr())
        dispatch(resetProjectMode())
        dispatch(resetKloc())
    };

    useEffect(() => {
        return () => {
            dispatch(setResultControl(false));
        }
    }, [])

    return (
        <>
            {(!checkResult)?(
                <>
                    <ProgectMode choosable={true}/>
                    <br />
                    <CodeLinesInput choosable={true}/>
                    <br />
                    <AdditionalAttributes choosable={true} />
                    <ResultButton customOnClick={() => handleCheckResult()} buttonText='Calculate'/>
                </>
            ):(
                <>
                    Gained results:
                    <br />
                    <br />
                    <Result />
                    <br />
                    <div className='centralized-homepage-container'>
                        <img src='/images/exportTextIcon.png' alt="Louder icon"/>
                    </div>
                    <br />
                    <p className='export-tip-text'>
                        You can export results in .pdf format using export option (last one) in left-side menu.
                    </p>
                    <DefaultButton customOnClick={() => handleCheckTryAgain()} buttonText='Reset' type='try-again'/>
                </>
            )}
            
        </>
    )
}