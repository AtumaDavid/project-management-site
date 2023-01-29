//gives us realtime document data

import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("no such documents exists");
        }
      },
      () => {
        console.log(error.message);
        setError("failed to get document");
      }
    );

    return () => unsubscribe();
  }, [collection, id, error]);

  return { document, error };
};
