import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationButton = ({ type, onClick, disabled }) => {
  const Icon = type === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-6 h-6 flex items-center justify-center rounded-md transition
        ${
          disabled
            ? "bg-[#0f131d] text-gray-500 cursor-not-allowed"
            : "bg-[#0f131d] text-white hover:border hover:border-[var(--primary-color)]"
        }
      `}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};

export default PaginationButton;
