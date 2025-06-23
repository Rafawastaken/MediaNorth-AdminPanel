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

export const HeadingButton = ({
  title = "",
  subtitle = "",
  path = "#",
  buttonText = "Adicionar",
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col space-y-0">
        <h1 className={"text-3xl font-bold"}>{title}</h1>
        <p className={"font-light text-md"}>{subtitle}</p>
      </div>
      <Link
        to={path}
        className={
          "bg-blue-500 text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-600 transtion-all duration-200"
        }
      >
        {buttonText}
      </Link>
    </div>
  );
};

export const HeadingButtonAndBack = ({
  title = "",
  subtitle = "",
  buttonPath = "#",
  buttonText = "Adicionar",
  buttonBackPath = "#",
}) => {
  return (
    <div className="flex justify-start items-center gap-5">
      <Link
        to={buttonBackPath}
        className={
          "bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-all duration-200"
        }
      >
        <ChevronLeft />
      </Link>

      <div className="flex flex-col space-y-0 self-start justify-self-start">
        <h1 className={"text-3xl font-bold"}>{title}</h1>
        <p className={"font-light text-md"}>{subtitle}</p>
      </div>
      <Link
        to={buttonPath}
        className={
          "bg-blue-500 text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 self-center ml-auto"
        }
      >
        {buttonText}
      </Link>
    </div>
  );
};
