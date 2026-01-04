import type { BookmarkProps } from "../App";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookmarkList({ bookmark, onDelete }: BookmarkProps) {
  return (
    <div>
      <ol className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 ">
        {bookmark.map((item, index) => (
          <li key={index}>
            <Card className="flex h-full flex-col justify-between p-2 text-center">
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
  );
}
