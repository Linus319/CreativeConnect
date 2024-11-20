import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface ImageProps {
    src: string;
    caption: string;

}

export default function ProfileContentImage({ src, caption }: ImageProps) {
    const [imageOpen, setImageOpen] = useState<boolean>(false);

    const handleToggleImage = () => {
        if (imageOpen) {
            setImageOpen(false);
        }
        else {
            setImageOpen(true);
        }
    };

    return (
        <div className="relative w-full h-full">
            <Search 
                className="absolute top-4 right-4 bg-gray-600 text-white rounded-xl p-2 opacity-50 hover:bg-gray-500" 
                width={40} 
                height={40}
                onClick={handleToggleImage}>
            </ Search>
            <Image 
                className="rounded-lg"
                src={src}
                alt={caption}
                layout="responsive"  
                width={300}          
                height={300}         
                objectFit="cover"    
            />
            <div className="caption-text mt-2 text-center text-sm text-gray-600">{caption}</div>
            {imageOpen && (
                <div className="p-20 fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="relative w-full h-full max-w-4xl max-h-4xl">
                        <button 
                            className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full"
                            onClick={handleToggleImage}
                        >
                            <X />
                        </button>
                        <Image
                            className="rounded-lg"
                            src={src}
                            alt={caption}
                            layout="intrinsic" 
                            width={1000}        
                            height={1000}       
                            objectFit="contain" 
                        />
                    </div>
                    <div className="caption-text m-8 text-center text-3xl text-white font-semibold">{caption}</div>
                </div>
            )}
        </div>
    )
}