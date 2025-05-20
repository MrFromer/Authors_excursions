import { useParams } from "react-router-dom";
import OuterShape from "./OuterShape"
import ExcurtionFullBlock from "./ExcursionFullBlock";

function ExcursionFullView() {
    const { excursionId } = useParams()
    return (
        <OuterShape innerShape=
            {
                <ExcurtionFullBlock />
            }
        />
    )
}

export default ExcursionFullView;