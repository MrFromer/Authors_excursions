import placeholder from "./assets/Teto_party.gif"
import OuterShape from "./OuterShape";

interface ExcursionFullBlockProps {
  image?: string;
  city?: string;
  dateStart?: string;
  dateEnd?: string | null;
  description?: string;
  childrenAllowed?: boolean;
  peopleMin?: number;
  peopleMax?: number;
}

function ExcursionFullViewBlock({
  image = placeholder, 
  city = "Барнаул", 
  dateStart = "1 Января 1970", 
  dateEnd = null, 
  description = "Экскурсия", 
  childrenAllowed = false, 
  peopleMin = 1, 
  peopleMax = 20
}: ExcursionFullBlockProps) {
  return (
    <OuterShape innerShape=
        {
            <div>
            <img src={image} alt={description} />
            <h1>{description}</h1>
            <p>Город: {city}</p>
            <p>Дата начала: {dateStart}</p>
            <p>Дата окончания: {dateEnd || "Не указано"}</p>
            <p>Минимальное количество людей: {peopleMin}</p>
            <p>Максимальное количество людей: {peopleMax}</p>
            <p>Дети допускаются: {childrenAllowed ? "Да" : "Нет"}</p>
            </div>
        }
    />
  );
}

export default ExcursionFullViewBlock;