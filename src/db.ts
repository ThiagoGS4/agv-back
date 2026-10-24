import { BSONType, MongoClient } from "mongodb"
import { hospitalMapValidator } from "@/schemas";

const client = new MongoClient('mongodb://localhost:27017');

let connected: MongoClient;
export const db = client.db('agv');

try{
    connected = await client.connect();
    const collections = await db.listCollections({ name: 'maps' }).toArray();
    if(collections.length === 0){
        db.createCollection('maps', {validator: hospitalMapValidator});
    }
    console.log("success on db connection");
} catch(error){
    console.log("error on db connect: ", error);
}







