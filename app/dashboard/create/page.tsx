import { uploadImage } from '@/lib/actions';

export default function CreateItem() {


  return (
    <>
      <form action={uploadImage}>
        <div className="flex flex-col">
          <label>Choose file</label>
          <input name="file" type="file" required/>
          <label>Caption</label>
          <input name="caption" type="text" required/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
        </div>
        
      </form>
    </>
  );

}
