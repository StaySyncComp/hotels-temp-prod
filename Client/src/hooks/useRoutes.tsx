import { useMatches } from "react-router-dom";

export function useRoutes() {
  const matches = useMatches();
  // @ts-ignore
  const current = [...matches].reverse().find((m) => m.handle?.documentTitle);
  return { currentRoute: current };
}
