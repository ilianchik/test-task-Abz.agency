import "./userStyles.scss";
function User({ user }) {
  return (
    <div className="user">
      <img src={user.photo || "/photo-cover.svg"} alt="user image" />
      <p className="clipped-text ">{user.name}</p>
      <div className="text-container">
        <p className="clipped-text ">{user.position}</p>
        <a className="clipped-text " href={`mailto:${user.email}`}>
          {user.email}
        </a>
        <a className="clipped-text " href={`tel:${user.phone}`}>
          {user.phone}
        </a>
      </div>
    </div>
  );
}

export default User;
