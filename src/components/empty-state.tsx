export const EmptyState = ({
  title,
  subtitle,
  actionButton,
}: {
  title: string;
  subtitle: string;
  actionButton: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/50 rounded-lg border-2 border-muted-foreground/25">
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-semibold text-muted-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground max-w-sm mx-auto">{subtitle}</p>
        {actionButton}
      </div>
    </div>
  );
};
