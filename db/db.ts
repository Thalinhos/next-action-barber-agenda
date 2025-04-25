import { MongoClient } from "mongodb";

async function getRawDB(){
    const client: any = new MongoClient(`${process.env.MONGO_URI}s`);
    await client.connect(); 
    if (!client.isConnected()) {
        throw new Error('Não foi possível conectar ao banco de dados');
    }
    return client.db('barber');
}

export async function getUsersCollection() {
    try {
        const db = await getRawDB();
        return db.collection('users');
    } catch (error) {
        return error
    }
}


