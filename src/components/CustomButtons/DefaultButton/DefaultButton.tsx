import { DefaultButtonProps } from "./defaultButtonProps"
import './defaultButton.css'


export function DefaultButton(props: DefaultButtonProps) {
    const { customOnClick, buttonText, type } = props
    return (
        <>
            <div className='button-wrapper'>
                <button className={`dashed thick ${type}-button`} onClick={() => customOnClick()}>{buttonText}</button>
            </div>
        </>
    )
}