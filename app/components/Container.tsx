import { PropsWithChildren } from "react";

export const Container: React.FC<PropsWithChildren> = (props) => {
  return <div className="max-w-lg mx-auto absolute inset-0 divide-y divide-gray-400 bg-blue-50">{props.children}</div>;
};

export const ContainerHeader: React.FC<PropsWithChildren> = (props) => {
  return <div className="h-32">{props.children}</div>;
};

export const ContainerScrollableBody: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="h-[calc(100%-8rem)]">
      <div className="overflow-y-scroll max-h-full">{props.children}</div>
    </div>
  );
};
