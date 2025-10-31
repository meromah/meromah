import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  FiChevronDown as ChevronDown,
  FiChevronRight as ChevronRight,
  FiFileText as FileText,
  FiGrid as Grid,
  FiBook as Book,
  FiLayers as Layers,
  FiSettings as Settings,
  FiLogOut as LogOut,
} from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ExpandableSection from "../pages/user/components/ExpandableSection";

const MenuLink = ({ to, label, icon: Icon, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all group"
    >
      {Icon && <Icon className="w-4 h-4 text-neutral-400" />}
      <span className="flex-1 text-left">{label}</span>
      <ChevronRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

const exploreData = [
  {
    id: "boards",
    title: "Boards",
    path: "explore/boards",
    icon: Grid,
  },
  {
    id: "Descs",
    title: "Descs",
    path: "explore/descs",
    icon: Book,
  },
];
const userFollowedItems = [
  {
    id: "boards",
    title: "Boards",
    path: "explore/boards",
    icon: Grid,
    items: [
      { id: "b1", title: "Algorithms 101" },
      { id: "b2", title: "Discrete Math" },
    ],
  },
  {
    id: "libraries",
    title: "Libraries",
    path: "explore/libraries",
    icon: Book,
    items: [
      { id: "l1", title: "Sorting Cheat Sheet.pdf" },
      { id: "l2", title: "Graph Notes.md" },
    ],
  },
  {
    id: "quizzes",
    title: "Quizzes",
    path: "explore/quizzes",
    icon: Layers,
    items: [
      { id: "q1", title: "DP Basics" },
      { id: "q2", title: "Trees & Graphs" },
    ],
  },
];

const createActionArr = [
  { label: "Community", path: "/create/community", icon: Grid },
  { label: "Post", path: "/create/post", icon: FileText },
  { label: "Test", path: "/create/test", icon: Layers },
];

const UserSidebar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const userMenuRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  //Getting data from Redux state
  const { profileData, isProfileDataLoading, profileDataError } = useSelector(
    (state) => state.myProfile
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { list: recentList } = useSelector((state) => state.recentCommunities);

  const recentSection = useMemo(
    () => ({
      id: "recent",
      title: "Recent",
      path: "",
      icon: false,
      items: recentList,
    }),
    [recentList]
  );
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

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleSection = useCallback((id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

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

  const getInitials = useCallback((name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, []);
  return (
    <div className="md:flex md:justify-between md:items-center">
      <div className="md:hidden flex sticky top-0 justify-between items-center border-b border-neutral-200 bg-white">
        {/* Logo Header - For Mobile devices */}
        <Link to="/home" className="flex-shrink-0 px-4 py-4">
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
        <Link
          to="/home"
          className="flex-shrink-0 px-4 py-4 border-b border-neutral-200"
        >
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
        <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
          {isAuthenticated && (
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
              <MenuLink
                to={"/explore/posts"}
                onClick={closeMobileMenu}
                icon={FileText}
                label={"Posts"}
                key={"Posts"}
              />

              {/* Section that displays user-followed boards, descs */}
              {userFollowedItems.map((section) => (
                <ExpandableSection
                  key={section.id}
                  section={section}
                  isExpanded={expandedSections[section.id]}
                  toggleSection={toggleSection}
                  closeMobileMenu={closeMobileMenu}
                />
              ))}
              <div className="h-px bg-neutral-200" />
            </div>
          )}
          {/* Recent communities */}
          <ExpandableSection
            key={"recent"}
            section={recentSection}
            isExpanded={expandedSections["recent"]}
            toggleSection={toggleSection}
            closeMobileMenu={closeMobileMenu}
          />
          <div className="h-px bg-neutral-200" />
          <div>
            <p className="w-full flex text-left mt-2 px-3 py-1.5 text-sm text-neutral-600  transition-all truncate">
              Explore
            </p>

            {exploreData.map((data) => (
              <MenuLink
                icon={data.icon}
                label={data.title}
                onClick={toggleMobileMenu}
                to={data.path}
                key={data.id}
              />
            ))}
          </div>
        </div>

        {/* User Card at Bottom */}
        {isAuthenticated ? (
          <div
            className="flex-shrink-0 border-t border-neutral-200 p-2 relative"
            ref={userMenuRef}
          >
            <button
              onClick={() =>
                !isProfileDataLoading && setUserMenuOpen(!userMenuOpen)
              }
              className="w-full flex items-center gap-3 px-2 py-3 hover:bg-neutral-100 rounded-lg transition-all group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              disabled={isProfileDataLoading}
            >
              {isProfileDataLoading ? (
                <>
                  {/* Loading skeleton for avatar */}
                  <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse flex-shrink-0" />

                  <div className="flex-1 min-w-0 text-left space-y-2">
                    {/* Loading skeleton for name */}
                    <div className="h-4 bg-neutral-200 rounded animate-pulse w-24" />
                    {/* Loading skeleton for username */}
                    <div className="h-3 bg-neutral-200 rounded animate-pulse w-20" />
                  </div>
                </>
              ) : (
                <>
                  {/* I am going to change this place holder into profile image later. */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">
                      {getInitials(profileData?.name || "User")}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {profileData?.name || "User"}
                    </p>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      to="profile"
                      className="text-xs text-neutral-500 truncate cursor-pointer hover:underline"
                    >
                      u/{profileData?.username || "username"}
                    </Link>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>
            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 pt-3 pb-2 text-xs text-neutral-500 truncate border-b border-neutral-200">
                  {profileData?.data?.email || "no email"}
                </div>
                <div className="p-1.5">
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all">
                    <Link to="profile/edit" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Edit profile
                    </Link>
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
        ) : (
            <div className="flex items-center justify-center py-2 px-4">
              <Link
                to="/login"
                className="block w-full py-2 px-4 rounded-lg bg-primary-blue text-white text-base font-medium text-center hover:bg-primary-blue/90 transition-colors"
              >
                Login
              </Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default UserSidebar;
