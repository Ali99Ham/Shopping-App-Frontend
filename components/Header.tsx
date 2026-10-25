"use client";
import Link from "next/link";
import {
  Bot,
  Menu,
  User,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { AuthContext } from "./Providers/AuthProvider";

export default function Header() {
  const isAuthenticated = useContext(AuthContext);
  const navLinks = [
    { name: "PRODUCTS", href: "/products" },
    { name: "PRICING", href: "/pricing" },
    { name: "BLOG", href: "/blog" },
  ];

  console.log("isAuthenticated", isAuthenticated);
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 md:px-8 text-neutral-100">
      {/* Left section: Logo & Desktop Navigation */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-wider"
        >
          <Bot className="h-6 w-6 text-white" />
          <span className="text-lg font-bold tracking-widest">L O G O</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider text-neutral-400">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right section: Profile Dropdown & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        {/* User Profile Avatar with Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-9 w-9 border border-neutral-700 bg-neutral-800 text-neutral-300 transition-opacity hover:opacity-90">
              <AvatarImage src="" alt="User Avatar" />
              <AvatarFallback className="bg-neutral-800 text-sm font-medium text-neutral-300">
                R
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 bg-neutral-900 border-neutral-800 text-neutral-200"
          >
            <DropdownMenuLabel className="text-xs text-neutral-400 font-medium">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-800" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer focus:bg-neutral-800 focus:text-white">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 w-full"
                >
                  <User className="h-4 w-4 text-neutral-400" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-neutral-800 focus:text-white">
                <Link
                  href="/account"
                  className="flex items-center gap-2 w-full"
                >
                  <Settings className="h-4 w-4 text-neutral-400" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-neutral-800 focus:text-white">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 w-full"
                >
                  <LayoutDashboard className="h-4 w-4 text-neutral-400" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-neutral-800" />
            <DropdownMenuItem
              className="cursor-pointer text-red-400 focus:bg-red-950/50 focus:text-red-300"
              onClick={() => {
                // Add your logout logic here
                console.log("Logged out");
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Navigation Drawer (Hamburger Icon) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-neutral-950 border-neutral-800 text-neutral-100"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-neutral-100 font-bold tracking-widest flex items-center gap-2">
                  <Bot className="h-5 w-5" />L O G O
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-semibold tracking-wider text-neutral-400 hover:text-white transition-colors py-2 border-b border-neutral-800"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
