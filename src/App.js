import './App.css';

import { db } from './firebase';
import { collection, getDocs, doc, addDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { query, collection, onSnapshot } from 'firebase/firestore';
// import { useEffect, useState } from 'react';

function App() {
  // const [stays, setStays] = useState([{}]);
  
  // Create
  const docID = 'uNqPFz6yRcccpOiSAsyi';
  const collectionName = 'Stays';

  const addFBDoc = async () => {
    const docRef = await addDoc(collection(db, collectionName), {
      name: 'Tokyo',
      country: 'Japan'
    });
    console.log('Document written with ID: ', docRef.id);
  }
  // Read

  const getCollection = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  }

  const getSingleDoc = async () => { 
    const docRef = doc(db, collectionName, docID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // useEffect(() => {
  //   const q = query(collection(db, 'Stays'));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let staysArray = [];
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //       staysArray.push({...doc.data(), id: doc.id});
  //     });
  //     setStays(staysArray);
  //   })
  //   return () => {
  //     unsubscribe();
  //   }
  // }, [stays]);

  // Update
  const updateFBDoc = async () => {
    const docRef = doc(db, 'Stays', docID);
    await updateDoc(docRef, {
      name: 'Tokyo',
      country: 'Japan',
      population: 13960000
    });
  }

  // Delete
  const deleteFBDoc = async () => {
    const docRef = doc(db, 'Stays', docID);
    await deleteDoc(docRef);
  }
  return (
    <div className="App">
      <div>
        <h1>App Content</h1></div>
        <button onClick={getCollection}>Get Docs</button>
        <p>
        <button onClick={addFBDoc}>Add Doc</button> 
        </p>
        <button onClick={getSingleDoc}>Get Single Doc</button>
        <button onClick={updateFBDoc}>Update Doc</button>
        <button onClick={deleteFBDoc}>Delete Doc</button>
    </div>
  );
}

export default App;
