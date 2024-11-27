'use client';
import { uploadImage } from '@/lib/actions';

export default function CreateItem() {

  function uploadThing(formData: FormData) {
    const file: File | any = formData.get('file');
    const fileType = file['type'];

    if (fileType.startsWith("image") || fileType.startsWith("audio")) {
      console.log("uploaded with uploadImage");
    } else {
      console.log("uploaded with special upload");
    }
  
    console.log(file);
  }



  return (
    <>
      <form action={uploadThing}>
        <div className="flex flex-col">
          <label>Choose file</label>
          <input name="file" type="file" accept="image/*, audio/*, video/*," required/>
          <label>Caption</label>
          <input name="caption" type="text" required/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
        </div>
        
      </form>
    </>
  );

}
