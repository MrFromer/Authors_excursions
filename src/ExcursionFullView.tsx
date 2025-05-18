import { useParams } from "react-router-dom";
import OuterShape from "./OuterShape"

function ExcursionFullView() {
    const { excursionId } = useParams()
    return (
        OuterShape(
            <label>
                Полный вид экскурсии {excursionId}
            </label>
        )
    )
}

export default ExcursionFullView;