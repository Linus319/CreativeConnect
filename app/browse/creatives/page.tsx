import UserList from '@/components/browse-creatives';
import { selectUsers } from '@/lib/actions';

export default async function FindCreatives() {


  return (
    <div className="flex flex-row max-w-screen-2xl w-5/6 h-4/5">
      <div id="selector" className="bg-blue-900 max-w-screen-md basis-1/2">
        <form action={selectUsers} className="flex flex-row justify-around">
          <label>Select Creative Type</label>
          <div>
            <input id="Music" name="music" type="checkbox"/>
            <label for="Music">Music</label>
          </div>
          <div>
            <input id="Video" name="video" type="checkbox"/>
            <label for="Video">Video</label>
          </div>
          <div>
            <input id="Graphics Design" name="graphics" type="checkbox"/>
            <label for="Graphics Design">Graphics Design</label>
          </div>
          <div>
            <input id="Photography" name="photography" type="checkbox"/>
            <label for="Photography">Photography</label>
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
