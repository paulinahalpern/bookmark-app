import BookmarkList from "./components/bookmark-list";
import Search from "./components/search";
import { useState } from "react";
import { api } from "./lib/api";

export type Bookmark = {
  index: string;
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
};

export type BookmarkProps = {
  bookmark: Bookmark[];
  onDelete: (id: string, index: number) => Promise<void>;
};

export default function App() {
  const [bookmark, setBookmark] = useState<Bookmark[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrlInput(event.target.value);
  }

  async function deleteBookmark(id: string, index: number) {
    try {
      await api.delete(`/bookmarks/${id}`);
      setBookmark((prevBookmark) => prevBookmark.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting bookmark- frontend", error);
    }
  }

  return (
    <div>
      <Search
        urlInput={urlInput}
        setBookmark={setBookmark}
        setUrlInput={setUrlInput}
        handleChange={handleChange}
      />
      <BookmarkList bookmark={bookmark} onDelete={deleteBookmark} />
    </div>
  );
}
