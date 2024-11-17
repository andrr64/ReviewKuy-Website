import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="bg-white min-h-screen border-2 p-10">
        {children}
    </div>
  );
}

export default Container;
