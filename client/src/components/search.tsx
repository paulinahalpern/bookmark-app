import { useEffect } from "react";
import { useState } from "react";
import { api } from "../lib/api";

export default function Search() {
  type Url = {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  const [bookmark, setBookmark] = useState<Url[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");

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

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrlInput(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (urlInput.trim() === "") {
      return;
    }
    try {
      const response = await api.post("/api", { url: urlInput });
      setBookmark((prev) => [...prev, response.data]);
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
          onChange={handleUrlChange}
        ></input>
        <button type="submit">ADD</button>
      </form>
      <ol>
        {bookmark.map((item, index) => (
          <li key={index}>{item.url}</li>
        ))}
      </ol>
    </div>
  );
}
