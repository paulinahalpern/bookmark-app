import type { BookmarkProps } from "../App";
import { api } from "../lib/api";

export default function BookmarkList({ bookmark, setBookmark }: BookmarkProps) {
  async function deleteBookmark(id: string, index: number) {
    try {
      await api.delete(`/api/${id}`);
      setBookmark((prevBookmark) => prevBookmark.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting bookmark- frontend", error);
    }
  }
  return (
    <div>
      <ol>
        {bookmark.map((item, index) => (
          <li key={index}>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.url}</p>
            <p>
              <img src={item.image} style={{ maxWidth: "200px" }} />
            </p>
            <button onClick={() => deleteBookmark(item.id, index)}>
              DELETE
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
