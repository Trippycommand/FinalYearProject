// Types:
import { Document, Filter, FindOptions } from 'mongodb'
// Libraries:
import { MongoClient } from 'mongodb'

// Validations:
if (!process.env.MONGODB_USERNAME || !process.env.MONGODB_PASSWORD) {
  throw new Error('MongoDB - Invalid/Missing environment variable')
}

// MongoDB Connection:
const DB_NAME = 'crypto-scout'
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cryptoscout.rlcni0i.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)
const CLIENT_PROMISE = client.connect()
export { CLIENT_PROMISE }

// Transactions:
export async function clientSession() {
  const client = await CLIENT_PROMISE
  const session = client.startSession()
  return session
}

// CREATE Document
type createDoc = {
  collection: string
  docData: Document
}
export async function createDoc(props: createDoc): Promise<boolean> {
  const collection = client.db(DB_NAME).collection(props.collection)
  const cursor = await collection.insertOne(props.docData)
  return cursor.insertedId !== null
}

// READ Documents
type getDocs = {
  collection: string
  filter: Filter<Document>
  options: FindOptions | undefined
}
export async function getDocs<RT>(props: getDocs): Promise<RT[]> {
  const collection = client.db(DB_NAME).collection(props.collection)
  const cursor = collection.find(props.filter, props.options)
  let docs: RT[] = []
  await cursor.forEach((doc) => {
    docs.push(doc as RT)
  })
  return docs
}

// READ Document
type getDoc = {
  collection: string
  filter: Filter<Document>
  options: FindOptions | undefined
}
export async function getDoc<RT>(props: getDoc): Promise<RT> {
  const collection = client.db(DB_NAME).collection(props.collection)
  const cursor = collection.findOne(props.filter, props.options)
  const doc = (await cursor) as RT
  return doc
}

// UPDATE Document
type updateDoc = {
  collection: string
  docData: Document
  filter: Filter<Document>
  options: FindOptions | undefined
  getOldDoc?: boolean
}
export async function updateDoc<RT>(props: updateDoc): Promise<RT | boolean> {
  const collection = client.db(DB_NAME).collection(props.collection)
  // If getOldDoc is true, return the old document
  if (props.getOldDoc) {
    const result = await collection.findOneAndUpdate(
      props.filter,
      props.docData,
    )
    const success = result?.ok === 1
    return success ? (result as RT) : false
  }
  // Else:
  const result = await collection.updateOne(props.filter, props.docData)
  const success = result.modifiedCount === 1
  return success
}
