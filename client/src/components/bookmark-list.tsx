import type { BookmarkProps } from "../App";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { api } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function BookmarkList({
  bookmark,
  onDelete,
  setBookmark,
}: BookmarkProps) {
  const [sort, setSort] = useState<"created_at" | "favourite">("created_at");

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const res = await api.get("/bookmarks", {
          params: { sort },
        });
        setBookmark(res.data);
      } catch (error) {
        console.error("Failed to fetch bookmarks", error);
      }
    }
    fetchBookmarks();
  }, [sort]);

  async function toggleFavourite(id: string, currentValue: boolean) {
    setBookmark((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavourite: !currentValue } : item
      )
    );

    try {
      await api.patch(`/bookmarks/${id}/favourite`, {
        isFavourite: !currentValue,
      });
      const res = await api.get("/bookmarks", { params: { sort } });
      setBookmark(res.data);
    } catch (error) {
      setBookmark((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isFavourite: currentValue } : item
        )
      );

      console.error("Failed to update favourite:", error);
    }
  }
  return (
    <div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="m-2 py-2 px-4 border rounded">
            Sort by
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setSort("created_at")}>
              Newest first
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSort("favourite")}>
              Favourited list
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <ol className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 ">
          {bookmark.map((item, index) => (
            <li key={index}>
              <Card className="flex h-full flex-col justify-between p-2 text-center">
                <Button
                  onClick={() => toggleFavourite(item.id, item.isFavourite)}
                >
                  {item.isFavourite ? <FaHeart /> : <CiHeart />}
                </Button>
                <img
                  src={item.image}
                  className="h-20 w-full object-contain object-center mb-2 rounded"
                />
                <CardContent className="p-1 text-sm font-semibold">
                  {" "}
                  {item.title}
                </CardContent>
                <CardContent className="p-1 text-xs line-clamp-2">
                  {item.description}
                </CardContent>
                <CardContent className="p-1 text-xs truncate">
                  {" "}
                  {item.url}
                </CardContent>
                <CardContent>
                  <Button size="sm" onClick={() => onDelete(item.id, index)}>
                    DELETE
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
