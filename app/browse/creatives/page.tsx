import UserList from '@/components/browse-creatives';
import { selectUsers } from '@/lib/actions';

export default function FindCreatives() {


  return (
    <div className="flex flex-row max-w-screen-2xl w-5/6 h-4/5">
      <div id="selector" className="bg-blue-900 max-w-screen-md basis-1/2">
        <form action={selectUsers} className="flex flex-row justify-around bg-green-500">
          <label>Select Creative Type</label>
          <div>
            <input id="Music" name="Music" type="checkbox" defaultChecked/>
            <label htmlFor="Music">Music</label>
          </div>
          <div>
            <input id="Video" name="Video" type="checkbox" defaultChecked/>
            <label htmlFor="Video">Video</label>
          </div>
          <div>
            <input id="Graphics Design" name="Graphic design" type="checkbox" defaultChecked/>
            <label htmlFor="Graphics Design">Graphics Design</label>
          </div>
          <div>
            <input id="Photography" name="Photography" type="checkbox" defaultChecked/>
            <label htmlFor="Photography">Photography</label>
          </div>
          <button type="submit" className="rounded-full bg-green-700 p-2">
            Reload
          </button>
        </form>
        <UserList />
      </div>

      <div id="preview" className="flow flow-col bg-red-900 max-w-screen-md basis-1/2">
      </div>



    </div>



  );

}
