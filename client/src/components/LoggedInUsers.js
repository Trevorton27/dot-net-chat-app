const LoggedInUsers = ({ users }) => (
  <div className='user-list'>
    <h4>Logged in Users</h4>
    {users.map((u, idx) => (
      <h6 key={idx}>{u}</h6>
    ))}
  </div>
);

export default LoggedInUsers;
