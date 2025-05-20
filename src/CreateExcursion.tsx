import OuterShape from './OuterShape';
import CreateExcursionInnerBlock from './CreateExcursionInnerBlock';

function CreateExcursion() {
  return (
    <OuterShape innerShape=
      {
        <CreateExcursionInnerBlock />
      }
    />
  )
}

export default CreateExcursion;