import { Link, useLocation } from 'react-router-dom'
import './menu.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { generatePdfResult } from '../../utils/generatePdfResult';
import { formatImport } from '../../utils/formatImport';
import { setProdAtr } from '../../store/adtProdAtrReducer';
import { setHwAtr } from '../../store/adtHwAtrReducer';
import { setPersAtr } from '../../store/adtPersAtrReducer';
import { setProjAtr } from '../../store/adtProjAtrReducer';
import { setKloc } from '../../store/klocReducer';
import { ProjectModesList } from '../../constants/projectModes';
import { setProjectMode } from '../../store/projectModeReducer';
import { readFile } from '../../utils/readJsonFile';
import { useState } from 'react';
import { AlertTypes } from '../../constants/alertTypes';
import Modal from 'react-modal';
import { DefaultButton } from '../CustomButtons/DefaultButton/DefaultButton';

export function Menu() {
    const location = useLocation();
    const dispatch = useAppDispatch()

    const [alert, setAlert] = useState({
        type: AlertTypes.ERROR,
        text: '',
        show: false
    })

    function onCloseAlert() {
        setAlert({
          type: AlertTypes.ERROR,
          text: '',
          show: false
        })
    }

    function onShowAlert(type: AlertTypes, text: string) {
        setAlert({
          type: type,
          text: text,
          show: true
        })
    }

    const checkResult = useAppSelector((state) => state.control.control.result)
    const projectMode = useAppSelector((state) => state.projectMode.projectMode)
    const kloc = useAppSelector((state) => state.kloc.kloc)
    const prodAtrMatrix = useAppSelector((state) => state.prodAtr.atrMatrix)
    const hwAtrMatrix = useAppSelector((state) => state.hwAtr.atrMatrix)
    const persAtrMatrix = useAppSelector((state) => state.persAtr.atrMatrix)
    const projAtrMatrix = useAppSelector((state) => state.projAtr.atrMatrix)

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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        console.log('1a')
        if (!file) return;

        const fileName = file.name;
        const fileExtension = (fileName.split('.'))[1].toLowerCase();
        if (fileExtension !== 'json') {
            console.error('Invalid file format. Only JSON files are allowed.');
            return;
        }

        console.log('2b')
    
        try {
            const fileContents = await readFile(file) as string;
            if (typeof fileContents === 'string') {
                console.log('3c')
                let data = JSON.parse(fileContents);
                data = await formatImport(data)
                let prodAtrMatrixData = data.prodAtrMatrix
                let hwAtrMatrixData = data.hwAtrMatrix
                let persAtrMatrixData = data.persAtrMatrix
                let projAtrMatrixData = data.projAtrMatrix
                if (Array.isArray(prodAtrMatrixData) && prodAtrMatrixData.every(subArray => Array.isArray(subArray) && subArray.every(item => typeof item === 'number'))) {
                    onShowAlert(AlertTypes.ERROR, 'Incorrect format of downloaded file.')
                    return
                }
                if (Array.isArray(hwAtrMatrixData) && hwAtrMatrixData.every(subArray => Array.isArray(subArray) && subArray.every(item => typeof item === 'number'))) {
                    onShowAlert(AlertTypes.ERROR, 'Incorrect format of downloaded file.')
                    return
                }
                if (Array.isArray(persAtrMatrixData) && persAtrMatrixData.every(subArray => Array.isArray(subArray) && subArray.every(item => typeof item === 'number'))) {
                    onShowAlert(AlertTypes.ERROR, 'Incorrect format of downloaded file.')
                    return
                }
                if (Array.isArray(projAtrMatrixData) && projAtrMatrixData.every(subArray => Array.isArray(subArray) && subArray.every(item => typeof item === 'number'))) {
                    onShowAlert(AlertTypes.ERROR, 'Incorrect format of downloaded file.')
                    return
                }
                if (typeof data.kloc !== 'string') {
                    onShowAlert(AlertTypes.ERROR, 'Incorrect format of downloaded file.')
                    return
                }
                if (!Object.values(ProjectModesList).includes(data.projectMode)) {
                    onShowAlert(AlertTypes.ERROR, 'Incorrect format of downloaded file.')
                    return
                }
                handleProdAtrMatrix(data.prodAtrMatrix)
                handleHwAtrMatrix(data.hwAtrMatrix)
                handlePersAtrMatrix(data.persAtrMatrix)
                handleProjAtrMatrix(data.projAtrMatrix)
                handleKloc(data.kloc)
                handleProjectMode(data.projectMode)

            } else {
                onShowAlert(AlertTypes.ERROR, 'Incorrect format of downloaded file.')
                console.error('File contents is not a string');
            }
        } catch (error) {
            onShowAlert(AlertTypes.ERROR, 'Failed to read JSON file.')
            console.error('Failed to read JSON file', error);
        }
    };

    const handleImportClick = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement
        if (fileInput) {
            fileInput.value = ''; // Очистка значения поля ввода
            fileInput.click();
        }
    }

    return (
        <>
            <Link to={"/home"}>
                <div className={`menu-item${(location.pathname === "/home" || location.pathname === "/" || location.pathname === "/result")?('-current'):('')} home-item`}>
                    <img src='/images/homeIcon.png' alt='Home icon'></img>
                </div>
            </Link>
            <Link to={"/history"}>
                <div className={`menu-item${(location.pathname === "/history" || location.pathname.includes('calculation'))?('-current'):('')} history-item`}>
                    <img src='/images/historyIcon.png' alt='History icon'></img>
                </div>
            </Link>
            <Link to={"/manual"}>
                <div className={`menu-item${(location.pathname === "/manual")?('-current'):('')} user-manual-item`}>
                    <img src='/images/userManualIcon.png' alt='User manual icon'></img>
                </div>
            </Link>
            <Link to={"/refinfo"}>
                <div className={`menu-item${(location.pathname === "/refinfo")?('-current'):('')} reference-information-item`}>
                    <img src='/images/referenceInformationIcon.png' alt='Reference information icon'></img>
                </div>
            </Link>
            {(location.pathname === "/" || location.pathname === "/home" ) && ((checkResult)?(
                <div className="menu-item export-item" onClick={() => generatePdfResult({prodAtrMatrix, hwAtrMatrix, persAtrMatrix, projAtrMatrix, kloc, projectMode})}>
                    <img src='/images/exportIcon.png' alt='Export icon'></img>
                </div>
            ):(
                <div>
                    <div className="menu-item import-item" onClick={() => handleImportClick()}>
                        <img src='/images/importIcon.png' alt='Import icon'></img>
                    </div>
                    <input id="fileInput" type="file" accept='.json' style={{ display: 'none' }} onChange={(event) => handleFileChange(event)} />
                </div>
            ))}
            <Modal
                shouldCloseOnEsc={true}
                isOpen={alert.show}
                contentLabel='Minimal Modal Example'
                className="modal"
                ariaHideApp={false}
            >
                <p style={{margin: 0, padding: 0}}>{alert.text}</p>
                <DefaultButton customOnClick={() => onCloseAlert()} buttonText='Close' type='close'/>
            </Modal>
        </>
    )
}
