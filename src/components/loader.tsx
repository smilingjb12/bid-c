import { Loader2 } from "lucide-react";

interface LoaderScreenProps {
  message?: string;
}

export default function Component({
  message = "Loading...",
}: LoaderScreenProps = {}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        <p
          className="mt-2 text-lg font-medium text-foreground"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </div>
  );
}
