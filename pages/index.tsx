import Link from "next/link";
import dbConnect from "../util/dbConnect";
import Character from "../model/character";
import Image from "next/image";
interface Character {
  _id: string;
  name: string;
  description: string;
  image_url: string;
}

const Index = ({ characters }: { characters: Character[] }) => (
  <>
    {characters.map((character) => (
      <div key={character._id}>
        <div className="card">
          <img src={character.image_url} alt={character.name} />
          <h5 className="character-name">{character.name}</h5>
          <div className="main-content">
            <p className="character-name">{character.name}</p>
            <p className="description">Description: {character.description}</p>

            <div className="btn-container">
              <Link
                href="/[id]/edit"
                as={`/${character._id}/edit`}
                legacyBehavior
              >
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${character._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

/* Retrieves character(s) data from mongodb database */
export async function getStaticProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Character.find({});
  const characters = result.map((doc) => {
    const character = doc.toObject();
    character._id = character._id.toString();
    return character;
  });

  return { props: { characters: characters } };
}

export default Index;
