import { useEffect } from "react";
import { api } from "../lib/api";
import type { Bookmark } from "../App";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { GiBookmark } from "react-icons/gi";

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
      .get("/bookmarks")
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
      const response = await api.post("/bookmarks", { url: urlInput });
      const [bookmark] = response.data;
      const newState = setBookmark((prev) => [...prev, bookmark]);
      console.log("Updated bookmarks:", newState);
      setUrlInput("");
    } catch (error) {
      console.error("Error adding api", error);
    }
  }

  return (
    <div className="flex md:px-10 py-4">
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 w-full max-w-lg"
      >
        <label htmlFor="addInput"></label>

        <Input
          id="addInput"
          type="text"
          value={urlInput}
          onChange={handleChange}
          placeholder="Enter bookmark URL"
        ></Input>

        <Button type="submit" variant="default">
          ADD <GiBookmark />
        </Button>
        
      </form>
   
    </div>
  );
}
