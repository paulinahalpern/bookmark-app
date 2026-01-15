import BookmarkList from "./components/bookmark-list";
import Search from "./components/search";
import { useState } from "react";
import { api } from "./lib/api";
import { Login } from "./components/login";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar";
import { SignUp } from "./components/sign-up";

export type Bookmark = {
  index: string;
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  isFavourite: boolean;
};

export type BookmarkProps = {
  bookmark: Bookmark[];
  onDelete: (id: string, index: number) => Promise<void>;
  setBookmark: React.Dispatch<React.SetStateAction<Bookmark[]>>;
};

export type SignUpProps = {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export default function App() {
  const [bookmark, setBookmark] = useState<Bookmark[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <Routes>
        <Route
          path="/"
          element={
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/bookmarks"
          element={
            <div className="flex  bg-gray-100">
              <div>
                <SideBar />
              </div>
              <div className="flex-1 p-6 ">
                <Search
                  urlInput={urlInput}
                  setBookmark={setBookmark}
                  setUrlInput={setUrlInput}
                  handleChange={handleChange}
                />
                <BookmarkList
                  bookmark={bookmark}
                  onDelete={deleteBookmark}
                  setBookmark={setBookmark}
                />
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
