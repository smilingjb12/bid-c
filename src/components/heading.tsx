import { cn } from "@/lib/utils";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("text-3xl font-bold mb-6 py-8", className)}>
      {children}
    </h1>
  );
};
