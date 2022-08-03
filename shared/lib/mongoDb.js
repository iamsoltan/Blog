import {  MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {}

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then(client => {
            return {
                client,
                db: client.db(MONGODB_DB)
            }
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export async function withMongo(fn) {
    const conn = await connectToDatabase()
    return await fn(conn.db)
}