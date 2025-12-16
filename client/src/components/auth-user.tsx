import { api } from "@/lib/api";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
};

export default function AuthUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("/users/me");
      setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Hi There, </h1>
      <h2>{user?.name}</h2>
    </div>
  );
}
