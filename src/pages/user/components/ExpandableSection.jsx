import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const ExpandableSection = ({
  section,
  isExpanded,
  toggleSection,
  closeMobileMenu,
}) => {
  const Icon = section.icon;

  return (
    <div key={section.id}>
      <button
        onClick={() => toggleSection(section.id)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-all cursor-pointer"
      >
        {Icon&&<Icon className="w-4 h-4 text-neutral-400" />}
        <span className="flex-1 text-left">{section.title}</span>
        <FiChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-200 ease-out ${
          isExpanded ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="space-y-0.5 pl-9">
          {section.items.length >0?(section.items.map((item) => (
            <Link
              key={item.id}
              to={item.to || "#"}
              onClick={()=>{closeMobileMenu();toggleSection(section.id)}}
              className="w-full flex text-left px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-all truncate"
            >
              {item.title}
            </Link>
          ))): (<p className="text-neutral-500 text-xs py-1">No {section.id} exists.</p>)}

          {section.id !== "recent"&&<button
            onClick={closeMobileMenu}
            className="w-full text-left px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all"
          >
            View all
          </button>}
        </div>
      </div>
    </div>
  );
};

export default ExpandableSection;
