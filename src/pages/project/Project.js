import React from "react";
import { useParams } from "react-router-dom";
import ProjectComments from "../../components/ProjectComments";
import { useDocument } from "../../hooks/useDocuments";
import "./Project.css";
import ProjectSummary from "./ProjectSummary";

export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">loading...</div>;
  }
  return (
    <div className="project-details">
      <h1>
        <ProjectSummary project={document} />
      </h1>
      <ProjectComments project={document} />
    </div>
  );
}
