import type { BookmarkProps } from "../App";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookmarkList({ bookmark, onDelete }: BookmarkProps) {
  return (
    <div>
      <ol className="flex flex-wrap gap-4">
        {bookmark.map((item, index) => (
          <li key={index}>
            <Card className="flex flex-col items-center text-center justify-between w-full sm:w-64 md:w-80 lg:w-96 p-4 min-h-[250px]">
              <img src={item.image} className="h-15 w-auto object-cover" />
              <CardContent className="flex-1"> {item.title}</CardContent>
              <CardContent className="flex-1">{item.description}</CardContent>
              <CardContent className="flex-1"> {item.url}</CardContent>
              <CardContent>
                <Button onClick={() => onDelete(item.id, index)}>DELETE</Button>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
