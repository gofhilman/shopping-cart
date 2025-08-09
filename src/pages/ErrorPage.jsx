import { useRouteError } from "react-router-dom";
import { HeartCrack } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <HeartCrack size={100} className="text-orange-300" strokeWidth={2} />
      <h1 className="mb-3 text-5xl font-bold text-orange-300">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occured.</p>
      <p className="my-1 text-lg font-medium text-neutral-500">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
