import logoutAction from './logoutAction';

export default async function LogoutBtn() {
  return (
    <form action={logoutAction}>
      <button style={{ marginTop: "8px" }}>Logout</button>
    </form>
  );
}

