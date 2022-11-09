import mongoose, { Schema } from 'mongoose'

/* CharacterSchema will correspond to a collection in your MongoDB database. */

interface ICharacter {
    _id: string;
    userId:string;
    name: string;
    image_url: string;
    description: string;
    favourite_users: string[];
    occupation: {name: string, credit: number[],skillPoint: string,skills: string};
    statuses:Object[];
    skills:Object[];
}

const CharacterSchema = new mongoose.Schema<ICharacter>({
  userId: {
    type: "String"
  },
  name: {
    type: "String"
  },
  image_url: {
    type: "String"
  },
  occupation: {
    name: {
      type: "String"
    },
    credit: {
      type: [
        "Number"
      ]
    },
    skillPoint: {
      type: "String"
    },
    skills: {
      type: "String"
    }
  },
  description: {
    type: "String"
  },
  statuses: {
    type: [Object]
  },
  skills: {
    type: [Object]
  },
  favourite_users: {
    type: [String]
  }
  })

export default mongoose.models.Character || mongoose.model('Character', CharacterSchema)
export type { ICharacter }