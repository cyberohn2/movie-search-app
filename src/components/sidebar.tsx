import { Calendar1, Home, Star, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navlinks = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      end: true,
    },
    {
      title: "Popular",
      url: "/popular",
      icon: Star,
    },
    {
      title: "Top Rated",
      url: "/top_rated",
      icon: TrendingUp,
    },
    {
      title: "Upcoming",
      url: "/upcoming",
      icon: Calendar1,
    },
  ];

  return (
    <div className="p-2 md:p-4 border-r border-r-gray-300 h-screen flex md:block flex-col items-center">
      <div className="flex items-center justify-center md:justify-normal gap-2 mb-10 w-fit md:w-auto">
        <img width={32} src="/logo.svg" alt="MovieHub logo" />
        <h1 className="hidden md:block font-bold">MovieHub</h1>
      </div>
      <ul className="space-y-6 w-fit md:w-auto">
        {navlinks.map((nav) => (
          <li key={nav.title} className="w-fit md:w-auto">
            <NavLink
              to={nav.url}
              end={nav.end}
              className={({ isActive }) =>
                `flex items-center gap-6 p-2 md:p-4 rounded-md w-fit md:w-auto transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <nav.icon className="fill-blue-500 stroke-0" />
              <span className="hidden md:block">{nav.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
