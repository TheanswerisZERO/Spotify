import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import SearchBar from "./SearchBar";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75
      backdrop-blur-md z-10
    "
    >
      <div className="flex shrink-0 gap-2 items-center">
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
        <h1 className="text-4xl md:text-3xl font-black tracking-tighter">
          <span className="text-white">3</span>
          <span className="text-[#FF1493] drop-shadow-[0_0_12px_#FF1493]">
            :
          </span>
          <span className="text-white">AM</span>
        </h1>
      </div>

      <SearchBar />

      <div className="flex shrink-0 items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4  mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;
