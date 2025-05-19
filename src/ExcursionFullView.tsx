import { useParams } from "react-router-dom";
import OuterShape from "./OuterShape"
import ExcurtionFullBlock from "./ExcursionFullBlock";

function ExcursionFullView() {
    const { excursionId } = useParams()
    return (
        OuterShape(<>
                { ExcurtionFullBlock() }
                <label>
                    Полный вид экскурсии {excursionId}
                </label>
            </>
        )
    )
}

export default ExcursionFullView;