import { createClient } from '@/utils/supabase/server';

export default async function Test() {
	const supabase = createClient();
	const { data: users } = await supabase.from("Test Table").select();

	return <pre>{JSON.stringify(users, null, 2)}</pre>
}
