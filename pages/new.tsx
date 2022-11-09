import { useEffect } from "react"
import Form  from "../components/Form"
import { ICharacter } from "../model/character"
import { initCharacter } from "../util/newCharacter"

const NewCharacter: React.FunctionComponent = (): JSX.Element => {
  const characterForm = {} as ICharacter
  useEffect(() => {
    initCharacter(characterForm)
    console.log(characterForm)
  }, [])
  

  return <Form formId="add-character-form" characterForm={characterForm} />
}

export default NewCharacter
