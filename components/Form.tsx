import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import {ICharacter} from '../model/character'

interface FormProps {
  formId: string
  characterForm: ICharacter
  forNewcharacter: boolean
}

const defaultProps = {
  forNewcharacter: true,
}

const Form = ({ formId, characterForm, forNewcharacter}:FormProps) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [cform, setForm] = useState(characterForm)

  useEffect(() => {
    console.log(cform)
  }, [cform])
  


  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form:ICharacter) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/characters/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      const { data } = await res.json()

      mutate(`/api/characters/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update character')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form:ICharacter) => {
    try {
      console.log(form)
      console.log(JSON.stringify(form))
      const res = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add character')
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value
    const name = target.name

    setForm({
      ...cform,
      [name]: value,
    })
  }

  /* Makes sure character info is filled for character name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    // if (!form.name) err.name = 'Name is required'
    // if (!form.owner_name) err.owner_name = 'Owner is required'
    // if (!form.species) err.species = 'Species is required'
    // if (!form.image_url) err.image_url = 'Image URL is required'
    return err
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewcharacter ? postData(cform) : putData(cform)
    } else {
      setErrors({ errs })
    }
  }

  return (
<>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength={20}
          name="name"
          value={cform.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          maxLength={20}
          name="description"
          value={cform.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={cform.image_url}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

Form.defaultProps = defaultProps

export default Form