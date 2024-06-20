import { useGetUsers } from "../../api/react-queries";
import User from "../user/User";
import Button from "../button/Button";

import "./usersSectionStyles.scss";

function UsersSection() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetUsers();

  return (
    <section className="users">
      <h1 className="title">Working with GET request</h1>
      <div className="users-grid">
        {status === "success" &&
          data.pages.map((page) =>
            page.users.map((user) => <User user={user} key={user.id} />)
          )}
      </div>

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Show more"}
        </Button>
      )}
    </section>
  );
}

export default UsersSection;
