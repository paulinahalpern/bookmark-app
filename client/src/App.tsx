import BookmarkList from "./components/bookmark-list";
import Search from "./components/search";
import { useState } from "react";

export default function App() {
  type Url = {
    title: string;
    description: string;
    image: string;
    url: string;
  };

  const [bookmark, setBookmark] = useState<Url[]>([]);
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
      <BookmarkList bookmark={bookmark} />
    </div>
  );
}
