import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";


function ExcurtionBlock(id: number = 0,city: string = "Барнаул", dateStart: string = "1 Января 1970", dateEnd: string | null = null, description: string = "Экскурсия", childrenAllowed: boolean = false, peopleMin: number = 1, peopleMax: number = 20) {
    const navigate = useNavigate()
    function handleClick()  {
        navigate(`/excursion/${id}`)
    }
    const k = 1.2
    return <>
        <button type='button' className="excursionBlockExternal roundedBlock noCursor" onClick={() => handleClick()} style={{width: "100%"}}>
            <img src="src/assets/Teto_party.gif" alt="Здесь могла быть ваша реклама" style={{height: `${13 * k}rem`, width: `${13 * k}rem`, borderRadius: "1rem", objectFit: "cover", objectPosition: "center" }}/>
            <div className="excursionBlockInternal" style={{flexGrow: 1}}>
                <label className="textStyle selectable-text">
                    <b>Город:</b> {city}
                </label>
                <label className="textStyle selectable-text">
                    <b>Дата:</b> {dateEnd? `c ${dateStart} до ${dateEnd}`: dateStart}
                </label>
                <label className="textStyle selectable-text">
                    <b>{childrenAllowed? "Дети допускаются": "Дети не допускаются"}</b>
                </label>
                <label className="textStyle selectable-text">
                    <b>Количество людей:</b> от {peopleMin} до {peopleMax}
                </label>
                <label className="textStyle selectable-text" style={{flexGrow: 1}}>
                    <b>Краткое описание:</b> {description}
                </label>
            </div>
        </button>
    </>
}

export default ExcurtionBlock