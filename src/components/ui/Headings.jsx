import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const HeadingStandard = ({ title = "", subtitle = "" }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className={"text-3xl font-bold"}>{title}</h1>
      <p className={"font-light text-md"}>{subtitle}</p>
    </div>
  );
};

export const HeadingStandardBack = ({
  title = "",
  subtitle = "",
  path = "#",
}) => {
  return (
    <div className="flex items-center gap-5">
      <Link
        to={path}
        className={
          "bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transtion-all duration-200"
        }
      >
        <ChevronLeft />
      </Link>
      <div className="flex flex-col space-y-0">
        <h1 className={"text-3xl font-bold"}>{title}</h1>
        <p className={"font-light text-md"}>{subtitle}</p>
      </div>
    </div>
  );
};
