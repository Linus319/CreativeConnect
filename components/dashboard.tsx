import { createClient } from '@/utils/supabase/server';
import { deleteItem } from '@/lib/actions';

function DeleteButton({ id }: { id: string}) {

  const deleteWithId = deleteItem.bind(null, id);

  return (
    <form >
      <button type="submit" className="flex items-center justify-center absolute -right-3 -top-3 bg-gray-700 rounded-full size-8">X</button>
    </form> 
  );

}

export async function Images({ deleteMode }: { deleteMode: string } ) {
  const supabase = createClient();

  const { data: images } = await supabase.from("images").select();

	const image_list = images?.map(img => 
                                 <div key={img.id} className="flex-auto relative">
                                  <a href={img.url}>
                                    <img src={img.url} className="rounded-lg"/>
                                  </a>
                                  {deleteMode == "true" ? 
                                  <DeleteButton id={img.id}/> : null }
                                </div>);

  return (
    <div className="grid grid-cols-4 m-5 gap-4">
      {image_list}
    </div>
  );
}

export async function Messages() {
  const supabase = createClient();

  const { data: users } = await supabase.from("users").select();
  const image = "https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png"

  const usersList = users?.map(user => <div className="flex-auto">
                                          <img src={image} className="rounded-full max-w-20"/>
                                          <div className="flex justify-center" > {user.display_name} </div>
                                        </div>);
  return (
    <div className="flex flex-row m-5 gap-4">
      {usersList}
    </div>
  );
}
