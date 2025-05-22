import { useParams } from "react-router-dom";
import OuterShape from "./OuterShape"
import ExcursionFullViewBlock from "./ExcursionFullViewBlock";
import { loadExcusionInfo } from "./utilities.ts"


function ExcursionFullView() {
    const { excursionId } = useParams()
    console.log(excursionId)
    if (!excursionId) {
        return (
            <OuterShape innerShape=
                {
                    <h1>
                        Невалидный ID у экскурсии
                    </h1>
                }
            />
        )
    }
    else {
        const id = Number.parseInt(excursionId)
        if (Number.isNaN(id)) {
            return (
                <OuterShape innerShape=
                    {
                        <h1>
                            Невалидный ID у экскурсии
                        </h1>
                    }
                />
            )
        }
        else {
            const excursionInfo = loadExcusionInfo(id)
            return (
                <OuterShape innerShape=
                    {
                        <ExcursionFullViewBlock image={excursionInfo.image} dateStart={excursionInfo.dateStart} dateEnd={excursionInfo.dateEnd}
                            shortDescription={excursionInfo.shortDescription} fullDescription={excursionInfo.fullDescription} childrenAllowed={excursionInfo.childrenAllowed}
                            city={excursionInfo.city} peopleMin={excursionInfo.peopleMin} peopleMax={excursionInfo.peopleMax}
                        />
                    }
                />
            )
        }
    }
}

export default ExcursionFullView;