import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarImage, AvatarFallback } from "./ui/avatar.jsx"
import { LogOut } from "lucide-react"
import { LinkIcon } from "lucide-react"
import { UrlState } from "../context.jsx"
import useFetch from "../hooks/use-fetch.jsx"
import { logout } from "../db/apiAuth.js"
import { BarLoader } from "react-spinners"

const Header = () => {
  const navigate = useNavigate()
  // const user = false

  const { user, fetchUser } = UrlState()

  const { loading, fn: fnLogout } = useFetch(logout)

  return (
    <>
      <nav className="flex items-center justify-between container mx-auto px-4 py-4">
        <Link to="/">
          <img src="/logo.png" alt="url logo" className="h-16" />
        </Link>

        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-12 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser()
                        navigate("/")
                      })
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  )
}

export default Header
