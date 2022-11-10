import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../util/dbConnect'
import  Character, {ICharacter} from '../../model/character'
import { Button } from '@mantine/core';

/* Allows you to view character card info and delete character card*/
const CharacterPage = ({ character }: { character: ICharacter }) => {
  const router = useRouter()
  const [message, setMessage] = useState<string>('')
  const handleDelete = async () => {
    const characterID = router.query.id

    try {
      await fetch(`/api/characters/${characterID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the character.')
    }
  }

  return (
    <div key={character._id}>
      <div className="card">
        <img src={character.image_url} />
        <h5 className="character-name">{character.name}</h5>
        <div className="main-content">
          <p className="character-name">{character.name}</p>
          <p className="description">Description: {character.description}</p>

          {/* Extra character Info: Likes and Dislikes */}
          {/* <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {character.favourite_users.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {character.favourite_users.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div> */}

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${character._id}/edit`} legacyBehavior>
              <Button className="btn edit">Edit</Button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export const getServerSideProps = async (context:any) => {
  await dbConnect()

  const id = context.params?.id
  const result = await Character.findById(id)
  const character = result.toObject() 
  character._id = character._id.toString()

  return { props: { character: character } }
}

export default CharacterPage
