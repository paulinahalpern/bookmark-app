interface Url {
  title: string;
  description: string;
  url: string;
  image: string;
}

interface BookmarkProps {
  bookmark: Url[];
}

export default function BookmarkList({ bookmark }: BookmarkProps) {
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
          </li>
        ))}
      </ol>
    </div>
  );
}
