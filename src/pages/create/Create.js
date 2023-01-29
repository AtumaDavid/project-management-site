import React, { useEffect, useState } from "react";
import Select from "react-select";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
//usecollection to get realtime data
import { useCollection } from "../../hooks/useCollection";
import "./Create.css";

//select categories
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  //useHistory
  const history = useHistory();

  //save data to firestore collection.  in this case, the collection will be called "projects"
  const { addDocument, response } = useFirestore("projects");

  const { documents } = useCollection("users");
  // console.log(documents);
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  //form field value
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("please select a project category");
      return;
    }
    //since assignedUser is an array
    if (assignedUsers.length < 1) {
      setFormError("please assign the project to at least one user");
      return;
    } else setFormError(null);

    //created by
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    //assigned users. => map through the assignedUsers and create a new array of different objects.(we dont need the label and value properties)
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    //project object=> essentially the object we save to the database as a document
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy, //storinng the information about the user who created this document. from the "created By"
      assignedUsersList, //is an array of objects where each object represents a user who this project is assigned to
    };

    // console.log(name, details, dueDate, category.value, assignedUsers);
    // console.log(project);
    await addDocument(project);
    //redirect users if there are no errors
    if (!response.error) {
      history.push("/");
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            type="text"
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assigned to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        {/* if there is a error in project category and asigning project */}
        {formError && <div className="error">{formError}</div>}

        <button className="btn">Add Project</button>
      </form>
    </div>
  );
}
