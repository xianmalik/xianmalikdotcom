import React from "react";

// Utils
import { classNames } from "@purpled/utils";

export default function Button(props) {
  const { children, className, light, ...rest } = props;

  return (
    <hr
      className={classNames(
        className,
        "h-0.5 w-12 block rounded-full relative my-4",
        light ? "bg-gray-50" : "bg-gray-900"
      )}
      {...rest}
    />
  );
}
