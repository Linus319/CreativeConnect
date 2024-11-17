"use client"

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubTypeMenu from "@/components/subtype-menu";
import StateSelect from "@/components/state-select";
import { useState, useEffect } from "react";
import { updateProfileDetails } from "@/app/actions";

export default function EditProfilePage() {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [subTypes, setSubTypes] = useState<string[]>([]);
    const [userType, setUserType] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const [state, setState] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");

    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    useEffect(() => {
        if (!email) {
            setError("No email address.");
            setLoading(false);
            return;
        }

        const fetchUserData = () => {
            let formData = new FormData(); 
            formData.append("email", email as string);
            fetch('/api/user-get', {body: formData, method: 'POST'} ).then((res) => 
                res.json()
            ).then((data) => {
                const user_info = data[0];
                setUserInfo(user_info);
                setSubTypes(user_info.sub_types || []);
                setUserType(user_info.user_type);
                setBio(user_info.bio);
                setCity(user_info.city);
                setState(user_info.state);
                setDisplayName(user_info.display_name);
                setLoading(false);
            });
    
        };

        fetchUserData();
    }, [email]);

    const handleSubTypeChange = (newSelectedSubTypes: string[]) => {
        setSubTypes(newSelectedSubTypes);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        for (let s of subTypes) {
            formData.append("sub-types", s);
        }

        await updateProfileDetails(formData, email);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 grid-rows-12 bg-gray-600 w-2/3">
                <div className="col-span-1 col-start-1 bg-gray-500 mt-4 mx-4 rounded flex justify-between items-center">
                    <Label htmlFor='display-name'>Display name</Label>
                    <Input 
                        name="display-name" 
                        value={displayName} 
                        onChange={(e: any) => setDisplayName(e.target.value)}
                    />
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
                    <Link className="text-primary font-medium underline" href="/profile/change-image"> {/* TODO: FIX  THE HREF*/}
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

                <div className="col-start-2">
                    <Label htmlFor='city'>City</Label>
                    <Input 
                        name="city" 
                        value={city || ""} 
                        placeholder={city ||"City"}
                        onChange={(e: any) => setCity(e.target.value)}
                    />
                </div>

                <div className="col-start-2">
                    <StateSelect state={state} setState={setState}/>
                </div>

                <div className="col-start-2 row-start-5 row-span-3">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                        name="bio" 
                        placeholder={bio || "Tell us about yourself"} 
                        value={bio || ""}
                        onChange={(e: any) => setBio(e.target.value)}
                        rows={4}
                        className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-500 resize-y overflow-auto"
                    />
                </div>
                
                <div className="row-start-12">
                    <button className="border rounded hover:bg-gray-400" type="submit">Submit Changes</button>
                </div>
            </form>
        </>
    )
}