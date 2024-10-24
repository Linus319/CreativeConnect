import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";


         //<img src="https://logos-world.net/wp-content/uploads/2020/07/Pringles-Logo.png"/> 
export default function Signup() {
  return (
    <form className="flex bg-gray-600 h-1/2 w-1/2">

        <div className="size-40 bg-emerald-600">
        </div>

        <div>
          <h1>Sign In</h1>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="Enter email..." required />
    
          <Label htmlFor="password">Password</Label>
          <Input name="password" placeholder="Enter password..." required />
          <SubmitButton> Sign In </SubmitButton>
        </div>

    </form>
  );

}
