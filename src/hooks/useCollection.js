//allows us to collect real time updates of specific collections and get the documents

//to collect data from the database
import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderby) => {
  const [documents, setDocuments] = useState(null); //to store document from the collection
  const [error, setError] = useState(null); //incase there is an error with the request

  //if we dont use a ref, an infinite loop will happen in the useEffect
  //_quey is an array and is "different" on every function call
  const query = useRef(_query).current;

  const orderby = useRef(_orderby).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    //firestore query
    if (query) {
      ref = ref.where(...query); //a partiicular logged in user don have access to another logged in user contents.
    }
    if (orderby) {
      ref = ref.orderBy(...orderby); //method we are using to order our document when we fetch them
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        //update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    //unsubscribeon unmount
    return () => unsubscribe;
  }, [collection, query, orderby]);

  return { documents, error };
};
