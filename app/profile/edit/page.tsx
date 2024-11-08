import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box, TextArea } from 'native-base';


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
        return <div>Couldn't retrieve user profile</div>;
    }

    const user_info = data[0];
    const sub_types = user_info.sub_types;
    const if_submitted: boolean = false; // FIX THIS WITH USE STATE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    

    return (
        <>
            <div className="grid grid-cols-4 grid-rows-12 bg-gray-600 w-5/6">
                <div>
                    <Link className="text-primary font-medium underline" href="/profile">
                        <Image 
                            src={if_submitted ? "/images/edit-profile-success.svg" : "/images/edit-profile-button.svg"} 
                            alt={if_submitted ? "Profile updated successfully!" : "Error updating profile, please try again later."} 
                            width = {30}
                            height = {30}
                        />
                    </Link>
                    <div>Temporary edit profile button</div>
                </div>
             


                
                <div className="grid row-span-12 col-start-1 bg-purple-600 m-4 rounded">
                    
                    <div className="row-span-1 row-start-1 bg-gray-500 mt-4 mx-4 rounded flex justify-between items-center">
                        <Label htmlFor='display-name'>Display name</Label>
                        <Input name="display-name" placeholder={user_info.display_name} />
                       
                    </div>
                    
                    <div className="row-start-2 row-span-2 bg-gray-500 mt-4 mx-4 rounded-full overflow-hidden w-2/3 h-2/3">
                        
                        <Image
                            src={user_info.profile_image ? user_info.profile_image : "/images/default-profile-image.jpg"}
                            alt="Profile pic"
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    
                    <div className="grid row-start-4 row-span-8 bg-gray-500 m-4 rounded">
                        
                        {/* <div className="row-span-8 bg-black">Bio</div> */} 

                        {/* <TextInput multiline stle= {{ height: this.state.height }}
                            onChange={this.onTextChange.bind(this)}
                            value={this.state.text}
                        /> */}

                        <Box alignItems="center" w="100%">
                            <TextArea h={20} placeholder="Tell us about yourself" w="75%" maxW="300" tvParallaxProperties={undefined} onTextInput={undefined} autoCompleteType={undefined} />
                        </Box>

                        <div className="bg-pink-600">
                            <div>{`${user_info.display_name}'s skills`}</div>
                            <div className="grid grid-cols-2 grid-rows-3">
                                {sub_types?.map((type: string) => (
                                    <div key={type} className="bg-blue-600 m-1">{type}</div>))}
                            </div>
                        </div>
                
                    </div>

                </div>
                <div className="row-span-12 col-start-2 col-span-3 bg-orange-400 m-4 rounded">Content</div>
            </div>
        </>
    )
}