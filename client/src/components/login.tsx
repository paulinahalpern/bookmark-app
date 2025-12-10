import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Login() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="p-3">Login to your account</CardTitle>
              <CardDescription>
                Click the below to login with your Google account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
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
