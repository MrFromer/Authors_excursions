import AccountPageInnerBlock from "./AccountPageInnerBlock"
import OuterShape from "./OuterShape"

const mockUser = {
  name: "Иван",
  surname: "Петров",
  username: "ivanpetrov",
  isGuide: true, // или false — чтобы проверить обе кнопки
};

function AccountPage() {
    return (
        <OuterShape innerShape={
            <AccountPageInnerBlock 
                name={mockUser.name}
                surname={mockUser.surname}
                username={mockUser.username}
                isGuide={false}
            />
            }
        />
    )
}


export default AccountPage