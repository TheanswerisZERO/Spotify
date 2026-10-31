import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/" className="rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="size-8 shrink-0"
          >
            <rect width="200" height="200" rx="44" fill="#FF1493" />
            <circle
              cx="100"
              cy="100"
              r="66"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              opacity="0.45"
            />
            <path
              d="M86 68 L86 132 L142 100 Z"
              fill="#fff"
              stroke="#fff"
              strokeWidth="7"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 mt-1">Manage your music catalog</p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};
export default Header;
