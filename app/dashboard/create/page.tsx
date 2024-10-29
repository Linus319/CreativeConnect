import { createItem } from '@/lib/actions';

export default function CreateItem() {


  return (
    <>
      <form action={createItem}>
        <div className="flex flex-col">
          <label>Enter Email...</label>
          <input name="email" type="text" required/>
          <label>Enter url..."</label>
          <input name="url" type="text" required/>
          <label>Caption...</label>
          <input name="caption" type="text" required/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
        </div>
        
      </form>
    </>
  );

}
