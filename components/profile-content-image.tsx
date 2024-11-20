import Image from 'next/image';

interface ImageProps {
    src: string;
    caption: string;

}

export default function ProfileContentImage({ src, caption }: ImageProps) {
    return (
        <div className="relative w-full h-full rounded-lg">
            <Image 
                src={src}
                alt={caption}
                layout="responsive"  // Makes it responsive to its container
                width={300}          // Width of the image container
                height={300}         // Height of the image container
                objectFit="cover"    // Ensures the image fills the container and maintains aspect ratio
            />
        </div>
    )
}