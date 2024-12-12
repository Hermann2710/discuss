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

      <div className="avatar">
        <div className="w-12">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>
  );
}
