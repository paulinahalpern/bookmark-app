import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function Login({ handleSubmit, setUsername, setPassword }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/signup">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardHeader>
          <div className="flex justify-between items-center">
            <div></div>
          </div>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            <a
              href={`${apiBaseUrl}/login/password`}
              className="hover:text-blue-500 p-4"
            >
              Login
            </a>
          </Button>
          <Button variant="outline" className="w-full">
            <a
              href={`${apiBaseUrl}/auth/google`}
              className="hover:text-blue-500 p-4"
            >
              Login with Google
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
