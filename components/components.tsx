import { createClient } from '@/utils/supabase/server';

export async function Images() {
	const supabase = createClient();

  const { data: images } = await supabase.from("images").select();

	const image_list = images.map(img => <div className="flex-auto"><a href={img.url}><img src={img.url} className="rounded-lg"/></a></div>);

	return (
		<div className="grid grid-cols-4 m-5 gap-4">
      {image_list}
    </div>
  );
}
      
