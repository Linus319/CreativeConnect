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
import { Button } from "@/components/ui/button";

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
            <form onSubmit={handleSubmit} className="w-1/2">
                <div className="bg-gray-500 mt-4 mx-4 rounded flex justify-between items-center">
                    <Label className="m-4" htmlFor='display-name'>Display name</Label>
                    <Input 
                        className="m-4 bg-gray-700"
                        name="display-name" 
                        value={displayName} 
                        onChange={(e: any) => setDisplayName(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-4">
                    <div className="col-start-1 col-span-3 bg-gray-500 mt-4 mx-4 rounded flex justify-between items-center">
                        <Label className="m-4" htmlFor='city'>City</Label>
                        <Input 
                            className="m-4 bg-gray-700"
                            name="city" 
                            value={city || ""} 
                            placeholder={city ||"City"}
                            onChange={(e: any) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="col-start-4 col-span-1 bg-gray-500 mt-4 mx-4 rounded flex justify-between items-center">
                        <div className="w-full">
                            <Label className="m-4" htmlFor="state">State</Label>
                            <StateSelect state={state} setState={setState}/>
                        </div>
                        
                    </div>
                </div>
                
                <div className="bg-gray-500 mt-4 mx-4 rounded flex justify-between items-center">
                    <Label className="m-4" htmlFor="bio">Bio</Label>
                    <textarea
                        name="bio" 
                        placeholder={bio || "Tell us about yourself"} 
                        value={bio || ""}
                        onChange={(e: any) => setBio(e.target.value)}
                        rows={4}
                        className="w-full p-2 m-4 rounded bg-gray-700 text-white border border-gray-500 resize-y overflow-auto"
                    />
                </div>
                
                <div className="grid grid-cols-2">
                    <div className="bg-gray-500 mt-4 mx-4 rounded flex justify-center items-center">
                        <Label className="m-4" htmlFor="sub-type">Sub Type</Label>
                        <div className="w-full my-4 mx-20 bg-gray-700 py-4 px-12 rounded">
                            <SubTypeMenu
                                userType={userType}
                                subTypes={subTypes}
                                onSubTypeChange={handleSubTypeChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col m-4 p-4 justify-center items-center bg-gray-500 mt-4 mx-4 rounded p-4t">
                        <div className="w-2/3 h-auto overflow-hidden rounded-full">
                            <Image
                                src={userInfo.profile_image ? userInfo.profile_image : "/images/default-profile-image.jpg"} 
                                alt="Profile pic"
                                width={100}
                                height={100}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="m-4">
                            <Button>
                                <Link href="/profile/change-image">Change Profile Image</Link>
                            </Button>
                        </div>
                    </div>
                    
                </div>
                
                <div className="col-span-2 bg-gray-500 mt-4 mx-4 p-4 rounded flex justify-center items-center">
                    <Button type="submit">Submit Changes</Button>
                </div>
            </form>
        </>
    )
}