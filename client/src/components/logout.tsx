import { Button } from "./ui/button";

export function Logout() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  return <Button><a href={`${apiBaseUrl}/auth/logout`} className="m-6">Logout</a> </Button>;
}
