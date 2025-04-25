import { getUsersCollection } from "@/db/db";

export async function GET(){
    try {
        const usersCollection = await getUsersCollection();
        const user = await usersCollection.find({}).toArray();
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify( error ), { status: 500 });
    }
}