export default function BookmarkList({ bookmark }) {
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
