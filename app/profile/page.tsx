import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProfilePage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
    }

    const { data, error } = await supabase.from("users").select('*').eq('email', user.email);

    if (error) {
        console.error('Error fetching user:', error);
        return <div>Couldn't return user profile</div>;
    }

    const user_info = data[0];

    return (
        <>
            <div className="grid grid-cols-4 grid-rows-12 bg-gray-600 w-5/6">
                <div className="grid row-span-12 col-start-1 bg-purple-600 m-4 rounded">
                    <div>
                        <Link className="text-primary font-medium underline" href="/profile/edit">
                            <Image 
                                src={"/images/edit-button.svg"} 
                                alt={"Edit profile button"} 
                                width = {30}
                                height = {30}
                            />
                        </Link>
                    </div>
                    <div className="row-span-1 bg-gray-500 mt-4 mx-4 rounded">{user_info.display_name}</div>
                    <div className="row-span-3 bg-gray-500 mt-4 mx-4 rounded-full overflow-hidden w-2/3 h-2/3">
                        <Image
                            src={user_info.profile_image ? user_info.profile_image : "/images/default-profile-image.jpg"}
                            alt="Profile pic"
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="grid row-span-8 bg-gray-500 m-4 rounded">
                        <div className="row-span-7 bg-gray-500">Bio</div>
                        <button className="row-span-1 border rounded hover:bg-gray-400">Send message</button>
                    </div>
                </div>
                <div className="row-span-12 col-start-2 col-span-3 bg-orange-400 m-4 rounded">Content</div>
            </div>
        </>
    )
}
