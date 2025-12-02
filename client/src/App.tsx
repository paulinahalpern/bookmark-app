import BookmarkList from "./components/bookmark-list";
import Search from "./components/search";
import { useState } from "react";

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
  setBookmark: React.Dispatch<React.SetStateAction<Bookmark[]>>;
};

export default function App() {
  const [bookmark, setBookmark] = useState<Bookmark[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrlInput(event.target.value);
  }

  return (
    <div>
      <Search
        urlInput={urlInput}
        setBookmark={setBookmark}
        setUrlInput={setUrlInput}
        handleChange={handleChange}
      />
      <BookmarkList bookmark={bookmark} setBookmark={setBookmark} />
    </div>
  );
}
