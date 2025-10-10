import React, { useState, useRef, useEffect } from "react";
import {
  FiChevronDown as ChevronDown,
  FiChevronRight as ChevronRight,
  FiFileText as FileText,
  FiGrid as Grid,
  FiBook as Book,
  FiLayers as Layers,
  FiSettings as Settings,
  FiHelpCircle as HelpCircle,
  FiLogOut as LogOut,
} from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const exploreItems = [
  {
    id: "boards",
    title: "Boards",
    path: "/user/explore/boards",
    icon: Grid,
    items: [
      { id: "b1", title: "Algorithms 101" },
      { id: "b2", title: "Discrete Math" },
    ],
  },
  {
    id: "libraries",
    title: "Libraries",
    path: "/user/explore/libraries",
    icon: Book,
    items: [
      { id: "l1", title: "Sorting Cheat Sheet.pdf" },
      { id: "l2", title: "Graph Notes.md" },
    ],
  },
  {
    id: "quizzes",
    title: "Quizzes",
    path: "/user/explore/quizzes",
    icon: Layers,
    items: [
      { id: "q1", title: "DP Basics" },
      { id: "q2", title: "Trees & Graphs" },
    ],
  },
];

const createActionArr = [
  { label: "Post", path: "/user/create/post", icon: FileText },
  { label: "Board", path: "/user/create/board", icon: Grid },
  { label: "Library", path: "/user/create/library", icon: Book },
  { label: "Quiz", path: "/user/create/quiz", icon: Layers },
];

const UserSidebar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const userMenuRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleNavigate = (path) => {
    console.log("Navigate to:", path);
  };

  return (
    <div className="md:flex md:justify-between md:items-center">
      <div className="md:hidden flex sticky top-0 justify-between items-center border-b border-neutral-200 bg-white">
        {/* Logo Header - For Mobile devices */}
        <Link to="/user" className="flex-shrink-0 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-lg font-semibold text-neutral-900">
              StudyHub
            </span>
          </div>
        </Link>
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-neutral-900/50 z-40 lg:hidden animate-fade-in"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden z-50 p-2 rounded-lg hover:bg-primary-blue/10 transition-colors duration-200"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <HiX className="text-2xl text-neutral-900" />
          ) : (
            <HiMenuAlt3 className="text-2xl text-neutral-900" />
          )}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 md:relative h-screen w-72 md:w-full flex flex-col bg-white border-r border-neutral-200 z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo Header */}
        <Link to="/user" className="flex-shrink-0 px-4 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-lg font-semibold text-neutral-900">
              StudyHub
            </span>
          </div>
        </Link>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {/* Create Button */}
            <div className="mb-3">
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all"
              >
                <span className="flex-1 text-left">Create new</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-200 ease-out ${
                  open ? "max-h-48 opacity-100 mt-1" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="space-y-0.5 pl-2">
                  {createActionArr.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        to={item.path}
                        key={item.path}
                        onClick={closeMobileMenu}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg transition-all"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="h-px bg-neutral-200 my-2" />
            {/* Posts Link */}
            <Link
              to="/user/explore/posts"
              onClick={closeMobileMenu}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all group"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              <span className="flex-1 text-left">Posts</span>
              <ChevronRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            {/* Collapsible Sections */}
            {exploreItems.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSections[section.id];
              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all"
                  >
                    <Icon className="w-4 h-4 text-neutral-400" />
                    <span className="flex-1 text-left">{section.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-200 ease-out ${
                      isExpanded
                        ? "max-h-96 opacity-100 mt-0.5"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="space-y-0.5 pl-9">
                      {section.items.map((item) => (
                        <Link
                          // to={""}
                          onClick={closeMobileMenu}
                          key={item.id}
                          className="w-full flex text-left px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-all truncate"
                        >
                          {item.title}
                        </Link>
                      ))}
                      <button
                        onClick={closeMobileMenu}
                        className="w-full text-left px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all"
                      >
                        View all
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* User Card at Bottom */}
        <div
          className="flex-shrink-0 border-t border-neutral-200 p-2 relative"
          ref={userMenuRef}
        >
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 px-2 py-3 hover:bg-neutral-100 rounded-lg transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {getInitials("John Doe")}
              </span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-neutral-900 truncate">
                John Doe
              </p>
              <p className="text-xs text-neutral-500 truncate">Free plan</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                userMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 pt-3 pb-2 text-xs text-neutral-500 truncate border-b border-neutral-200">
                johndoe@email.com
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => handleNavigate("/user/settings")}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Edit profile
                  </span>
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all">
                  <span>Language</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
              <div className="h-px bg-neutral-200 mx-1.5" />
              <div className="p-1.5">
                <button className="w-full flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
