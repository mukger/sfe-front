import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setKloc } from "../../store/klocReducer";
import './codeLinesInput.css'
import { setInputWarningControl } from "../../store/controlReducer";
import { codeLinesInputProps } from "./codeLinesInputProps";

export function CodeLinesInput(props: codeLinesInputProps) {
    const dispatch = useAppDispatch()
    const kloc = useAppSelector((state) => state.kloc.kloc)
    const checkInputWarning = useAppSelector((state) => state.control.control.inputWarning)

    const { choosable } = props

    const handleKloc = (newKloc: String) => {
        dispatch(setKloc(newKloc));
    };

    useEffect(() => {
        if (kloc && kloc.length > 0) {
            dispatch(setInputWarningControl(false))
        }
    }, [kloc, dispatch])

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        if (!isNaN(Number(inputValue))) {
            handleKloc(inputValue);
        }
    }

    return (
        <>
            {((choosable) || (!choosable && kloc))&&(
                <>
                    <label>Code lines number (in thousands):   </label>
                    <input 
                        className="code-lines-input" 
                        type='text' 
                        onChange={(event) => (choosable)?(onChangeHandler(event)):('')}
                        value={String(kloc)} 
                        placeholder={(checkInputWarning)?('       required'):('for example 123456')}
                        style={{
                            border: (checkInputWarning)?('0.5px solid red'):('none'),
                            borderRadius: (checkInputWarning)?('75% 45% 75% 45%'):('0')
                        }}
                        readOnly={!choosable}
                    />
                </>
            )}
        </>
    )
}