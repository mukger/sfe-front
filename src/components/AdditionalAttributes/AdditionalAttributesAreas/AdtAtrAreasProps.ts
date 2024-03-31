import { Dispatch, SetStateAction } from "react";
import { AttributeAreasList } from "../../../constants/attributes";

export class AdtAtrAreasProps {
    choosenAtr: AttributeAreasList
    setChoosenAtr: Dispatch<SetStateAction<AttributeAreasList>>
}