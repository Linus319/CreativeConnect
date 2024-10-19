import { createClient } from '@/utils/supabase/server';

export default async function Test() {
	const supabase = createClient();
	const { data: users } = await supabase.from("users").select();

	const { data: images } = await supabase.from("images").select();

	const { data: audio } = await supabase.from("audio").select();

	const { data: video } = await supabase.from("video").select();

	const image_list = images.map(img => <div><img src={img.url}/></div>);
	return (
		<>
			<div className="flex flex-row">
			{image_list}
			</div>
		</>
	);


	//return <pre>{JSON.stringify(video, null, 2)}</pre>
}
