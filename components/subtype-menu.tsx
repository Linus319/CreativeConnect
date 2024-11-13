"use client"

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";

interface SubtypeMenuProps {
    userType: string;
    subTypes: string[];
    onSubTypeChange: (subTypes: string[]) => void;
}


export default function SubTypeMenu({ userType, subTypes, onSubTypeChange }: SubtypeMenuProps) {
    const [selectedSubTypes, setSelectedSubTypes] = useState<string[]>(subTypes);
    const creativeSubTypes = ['Music', 'Video', 'Graphic design', 'Fashion', 'Animation', 'Photography'];
    const venueSubTypes = ['Event space', 'Art gallery', 'Performance venue', 'Recording studio', 'Photography studio', 'Rehearsal space'];

    useEffect(() => {
        setSelectedSubTypes(subTypes);
    }, [subTypes])

    const handleSubTypeChange = (e: any) => {
        const { value, checked } = e.target;
        let newSelectedSubTypes = [...selectedSubTypes];
        if (checked) {
            newSelectedSubTypes.push(value);
        }
        else {
            newSelectedSubTypes = newSelectedSubTypes.filter((subType) => subType !== value);
        }

        setSelectedSubTypes(newSelectedSubTypes);
        onSubTypeChange(newSelectedSubTypes);
    };

    return (
        <>
            <Label htmlFor="sub-type">Sub type</Label>
            <div>
                {userType === "creative" && creativeSubTypes.map((subType) => (
                    <div key={subType}>
                        <input 
                            type="checkbox" 
                            name={subType} 
                            id={subType} 
                            checked={selectedSubTypes.includes(subType)}
                            onChange={handleSubTypeChange} 
                            value={subType}
                        />
                        <label htmlFor={subType}>{subType}</label>
                    </div>
                ))}
                {userType === "venue" && venueSubTypes.map((subType) => (
                    <div key={subType}>
                        <input 
                            type="checkbox" 
                            name={subType} 
                            id={subType}
                            checked={selectedSubTypes.includes(subType)}
                            onChange={handleSubTypeChange} 
                            value={subType}
                        />
                        <label htmlFor={subType}>{subType}</label>
                    </div>
                ))}
            </div>
        </>
    )
}