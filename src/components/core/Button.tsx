import React from "react";

// Utils
import { classNames } from "@purpled/utils";

export default function Button(
  { children, className, ...rest }:
  { children: React.ReactNode; className?: string }
) {
  return (
    <button
      className={classNames(
        className,
        "group relative inline-block box-content",
        "font-serif font-medium text-sm tracking-widester uppercase",
        "text-gray-900",
        // "text-gray-300 border border-gray-300 px-6 py-1.5 rounded-full hover:bg-gray-300 hover:text-black transition-colors cursor-pointer"
      )}
      {...rest}
    >
      <span
        className={classNames(
          "block bg-gray-200 h-6 w-12 group-hover:w-full transition-all",
          "absolute left-0 top-1/2 -translate-y-1/2 z-0"
        )}
      ></span>
      <span className="px-4 block relative z-10 text-gray-900">{children}</span>
      <span
        className={classNames(
          "block bg-purple-700 h-3 w-3 -mr-1.5 rounded-full",
          "absolute right-full top-1/2 transform -translate-y-1/2 z-0"
        )}
      ></span>
    </button>
  );
}
