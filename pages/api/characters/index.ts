import dbConnect from '../../../util/dbConnect'
import Character from '../../../model/character'

export default async function handler(req: any, res: any) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const characters = await Character.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: characters })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const character = await Character.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: character })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
