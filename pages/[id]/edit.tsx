import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'
import { ICharacter } from '../../model/character'

const fetcher = (url:string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const Editcharacter = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: character, error } = useSWR(id ? `/api/characters/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!character) return <p>Loading...</p>

  const characterForm = {
    ...character
  } as ICharacter

  return <Form formId="edit-character-form" characterForm={characterForm} forNewcharacter={false} />
}

export default Editcharacter
