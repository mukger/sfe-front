import { attributeAreas, AttributeAreasList } from '../../../constants/attributes';
import { AdtAtrAreasProps } from './AdtAtrAreasProps';

export function AdditionalAttributesAreas(props: AdtAtrAreasProps) {

    const { choosenAtr, setChoosenAtr } = props

    function onClickAtrArea(attributeArea: AttributeAreasList) {
        setChoosenAtr(attributeArea)
    }

    return (
        <div className='adt-atr-areas'>
            {attributeAreas.map((attributeArea, index) => (
                <div key={`adtAtr${index}`} className='adt-atr-areas-item'>
                    <span
                        onClick={() => onClickAtrArea(attributeArea as AttributeAreasList)}
                        style={{
                            color: (choosenAtr === attributeArea)?('green'):('black'),
                            fontWeight: (choosenAtr === attributeArea)?('bold'):('normal'),
                            textDecoration: (choosenAtr === attributeArea)?('underline'):('none')
                        }}
                    >
                        {attributeArea}
                    </span>
                </div>
            ))}
        </div>
    )
}