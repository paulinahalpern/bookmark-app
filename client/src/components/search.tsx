import { useEffect } from "react";
import { api } from "../lib/api";
import type { Bookmark } from "../App";

interface SearchProps {
  urlInput: string;
  setBookmark: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  setUrlInput: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({
  urlInput,
  setBookmark,
  setUrlInput,
  handleChange,
}: SearchProps) {
  useEffect(() => {
    api
      .get("/api")
      .then((res) => {
        setBookmark(res.data);
      })
      .catch((error) => {
        console.error("Error fetching bookmark:", error);
      });
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (urlInput.trim() === "") {
      return;
    }
    try {
      const response = await api.post("/api", { url: urlInput });
      const [bookmark] = response.data;
      const newState = setBookmark((prev) => [...prev, bookmark]);
      console.log("Updated bookmarks:", newState);
      setUrlInput("");
    } catch (error) {
      console.error("Error adding api", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="addInput"></label>
        <input
          id="addInput"
          type="text"
          value={urlInput}
          onChange={handleChange}
        ></input>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}
