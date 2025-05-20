import { useParams } from "react-router-dom";
import OuterShape from "./OuterShape"
import ExcursionFullViewBlock from "./ExcursionFullViewBlock";

function ExcursionFullView() {
    const { excursionId } = useParams()
    return (
        <OuterShape innerShape=
            {
                <ExcursionFullViewBlock />
            }
        />
    )
}

export default ExcursionFullView;