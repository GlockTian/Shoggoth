import  characterJson from '../json/character.json'
import skillJson from '../json/skills.json'
import  occJson from '../json/occupations.json'
import  statusJson from '../json/status.json'
import { ICharacter } from '../model/character'
import { Console } from 'console'

export const initCharacter = async (c:ICharacter) => {
  c.occupation = occJson.occupations[0]
  c.skills = skillJson.skills
  c.statuses = statusJson.statuses
  console.log(c)
  return c
}