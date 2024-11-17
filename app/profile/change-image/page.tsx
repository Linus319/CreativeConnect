import { uploadProfileImage } from '@/lib/actions';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChangeProfileImage() {
  return (
    <>
      <form action={uploadProfileImage}>
        <div className="flex flex-col space-y-4">
          <Label className="text-white text-lg">Choose file</Label>
          
          <Input 
            name="file" 
            type="file" 
            required
            className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
          
          <Button 
            type="submit" 
            className="w-full py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >Submit</Button>
        </div>
      </form>
    </>
  );

}
