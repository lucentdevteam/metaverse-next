import {db} from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function getData(colllectionName) {
    
    
    let data = [];
    const querySnapshot = await getDocs(collection(db, colllectionName));
    
    querySnapshot.forEach((doc) => {
        data.push(doc._document.data.value.mapValue.fields)
    });

    return data
    // return { result, error };
}