import { createClient } from '@/utils/supabase/server';

export async function Images() {
  const supabase = createClient();

  const { data: images } = await supabase.from("images").select();

<<<<<<< HEAD
	const image_list = images?.map(img => <div className="flex-auto"><a href={img.url}><img src={img.url} className="rounded-lg"/></a></div>);
=======
  const image_list = images?.map(img => <div className="flex-auto"><a href={img.url}><img src={img.url} className="rounded-lg" /></a></div>);
>>>>>>> ac550db56788fe34e174526473c413664c423669

  return (
    <div className="grid grid-cols-4 m-5 gap-4">
      {image_list}
    </div>
  );
}

