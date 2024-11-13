"use client"

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubTypeMenu from "@/components/subtype-menu"
import { useState, useEffect } from "react";

export default async function EditProfilePage() {
    const supabase = createClient();

    const [user, setUser] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [subTypes, setSubTypes] = useState<string[]>([]);
    const [userType, setUserType] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error("Error fetching user:", userError);
                return redirect('/sign-in');
            }

            setUser(user);

            const { data, error } = await supabase.from("users").select("*").eq("email", user.email);

            if (error) {
                console.error("Error fetching user profile:", error);
                return <div>Couldn't retrieve user profile</div>
            }

            const user_info = data[0];
            setUserInfo(user_info);
            setSubTypes(user_info.sub_types || []);
            setUserType(user_info.user_type);
        };

        fetchUserData();
    }, [supabase]);

    const handleSubTypeChange = (newSelectedSubTypes: string[]) => {
        setSubTypes(newSelectedSubTypes);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // // Update the user's profile with the new subtypes
        // const { error } = await supabase.from('users')
        //     .update({ sub_types: subTypes })
        //     .eq('email', user.email);

        // if (error) {
        //     console.error('Error updating user profile:', error);
        // } else {
        //     console.log('User profile updated successfully');
        //     // Redirect or show success message
        // }
    };

    if (!user || !userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 grid-rows-12 bg-gray-600 w-2/3">
            <div className="col-span-1 col-start-1 bg-gray-500 mt-4 mx-4 rounded flex justify-between items-center">
                <Label htmlFor='display-name'>Display name</Label>
                <Input name="display-name" placeholder={userInfo.display_name} />
            </div>
            <div className="col-start-1 col-span-1 items-center">
                <div className="mt-4 mx-4 rounded-full overflow-hidden w-1/2 h-2/3 ">
                    <Image
                        src={userInfo.profile_image ? userInfo.profile_image : "/images/default-profile-image.jpg"} 
                        alt="Profile pic"
                        width={150}
                        height={150}
                        className="object-cover w-full h-full"
                    />
                    
                </div>
                <Link className="text-primary font-medium underline" href="/profile/edit"> {/* TODO: FIX  THE HREF*/}
                    <Image 
                        src={"/images/edit-button.svg"} 
                        alt={"Edit profile image button"} 
                        width = {30}
                        height = {30}
                    />
                </Link>
            </div>

            <div className="col-start-1 col-span-1 row-start-6">
                <SubTypeMenu
                    userType={userType}
                    subTypes={subTypes}
                    onSubTypeChange={handleSubTypeChange}
                />
            </div>
            
            <div>
                <button type="submit">Submit Changes</button>
            </div>
            
        </form>
        </>
    )
}