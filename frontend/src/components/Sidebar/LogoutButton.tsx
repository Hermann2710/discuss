import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto flex flex-col justify-between">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 mt-4 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}
