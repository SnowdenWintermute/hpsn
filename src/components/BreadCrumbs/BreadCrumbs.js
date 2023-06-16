import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function BreadCrumbs() {
  return (
    <nav className="flex " aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="/classes" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-4 w-4 flex-shrink-8" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <Link href="/classes" className="text-xs text-gray-500">
               Classes
           
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
}
