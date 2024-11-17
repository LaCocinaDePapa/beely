import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa6";

function UserBtn() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated)
    return (
      <>
        <Link
          to="signin"
          className="flex text-sm items-center gap-2 px-4 py-1.5 rounded-md transition bg-blue-700 hover:bg-blue-800 lg:text-base"
        >
          Get started
          <FaArrowRight className="w-3" />
        </Link>
      </>
    );

  if (isAuthenticated)
    return (
      <>
        <div className="cursor-pointer avatar">
          <div className="z-10 w-8 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
            <img
              className="rounded-full"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
      </>
    );
}

export default UserBtn;
