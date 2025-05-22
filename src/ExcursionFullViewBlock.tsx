import placeholder from "./assets/Teto_party.gif"
import { ExcursionFullBlockProps, signForExcursion } from "./utilities";

function ExcursionFullViewBlock({
  id = 0,
  image = placeholder, 
  city = "Барнаул", 
  dateStart = "1 Января 1970", 
  dateEnd = undefined, 
  shortDescription = "Краткое описание", 
  fullDescription = "Полное описание",
  childrenAllowed = false, 
  peopleMin = 1, 
  peopleMax = 20
}: ExcursionFullBlockProps) {
  const k = 1;
  return (
    <div className="wrapper">
      <div className="excursionFullViewExternal noCursor">
        <img src={image} alt="Здесь могла быть ваша реклама" style={{
          borderRadius: "1.5rem",
          border: "1px solid black",
          width: `${40 * k}vw`,
          height: `${25 * k}vw`,
          objectFit: "cover",
          objectPosition: "center",
        }}/>
        <div className="excursionFullViewInternal">
          <label className="textStyle"><b>Город:</b> {city}</label>
          <div
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            width: '100%',
            minHeight: '1.5em',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            textAlign: "left",
          }}
          className="selectable-text tStyle"
        >
          <b>Полное описание:</b> {fullDescription} 
        </div>
          <label className="textStyle"><b>Дата:</b> {dateEnd ? `С ${dateStart} до ${dateEnd}`: dateStart}</label>
          <label className="textStyle"><b>Минимальное количество людей:</b> {peopleMin}</label>
          <label className="textStyle"><b>Максимальное количество людей</b>: {peopleMax}</label>
          <label className="textStyle"><b>{childrenAllowed ? "Дети допускаются" : "Дети не допускаются"}</b></label>
        </div>
        <button className="tinkoffButton" onClick={() => signForExcursion(id)}>
          Записаться на экскурсию
        </button>
      </div>
    </div>
  );
}

export default ExcursionFullViewBlock;