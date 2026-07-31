export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-200 border-t-accent" />
        <p className="text-sm text-stone-400">A carregar...</p>
      </div>
    </div>
  );
}

interface ErrorScreenProps {
  message: string;
}

export function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="mb-3 font-serif text-2xl font-semibold text-stone-800">
          Algo correu mal
        </h1>
        <p className="text-stone-500">{message}</p>
      </div>
    </div>
  );
}
