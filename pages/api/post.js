import { withMongo } from 'shared/lib/mongoDb'
import nc from 'next-connect'
import { ObjectId } from 'mongodb';



export default nc()
    .get(async (req, res) => {
        let post = null

        if (req.query._id) {

            post = await withMongo(async (db) => {
                const collection = db.collection('post')

                const myid = new ObjectId(req.query._id);
                return await collection.findOne({ _id: myid })
            })
        } else {
            post = await withMongo(async (db) => {
                const collection = db.collection('post')
                return await collection.find().toArray()
            })
        }
        return res.json(post)
    })
    .post(async (req, res) => {

        await withMongo(async (db) => {
            const collection = db.collection('post')
            await collection.insertOne({
                title: req.body.title,
                author: req.body.author,
                vote: req.body.vote,
                excerpts: req.body.excerpts,
                img: req.body.img,
                content: req.body.content,
                created: new Date().toISOString(),
                updated: new Date().toISOString()
            })
        })

        return res.status(204).end()
    })