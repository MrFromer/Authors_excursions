import "react-datepicker/dist/react-datepicker.css";
import OuterShape from "./OuterShape";
import MainPageInnerBlock from "./MainPageInnerBlock";

function MainPage() {
    return (
        <OuterShape innerShape=
            {
                <MainPageInnerBlock />
            }
        />
    )
}

export default MainPage;