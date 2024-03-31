import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import './resultButton.css'
import { resultButtonProps } from './resultButtonProps'
import { setInputWarningControl } from '../../../store/controlReducer'

export function ResultButton(props: resultButtonProps) {
    const dispatch = useAppDispatch()
    const { customOnClick, buttonText } = props
    const kloc = useAppSelector((state) => state.kloc.kloc)

    const handleOnClick = () => {
        if (kloc && kloc.length > 0) {
            customOnClick()
        }
        else {
            dispatch(setInputWarningControl(true))
        }
    }

    return (
        <>
            <div className='buttonWrapper'>
                <button className='dashed thick result-button' onClick={() => handleOnClick()}>{buttonText}</button>
            </div>
        </>
    )
}