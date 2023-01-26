import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, SetThumbnail] = useState(null);
  const [thumbnailError, SetThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password, displayName, thumbnail);
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    SetThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      SetThumbnailError("please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      SetThumbnailError("selected file must be an image");
      return;
    }
    if (!selected.size > 1000000) {
      SetThumbnailError("image file size must be less than 1000kb");
      return;
    }

    SetThumbnailError(null);
    SetThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile picture:</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      {!isPending && <button className="btn">signup</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
