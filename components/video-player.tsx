interface VideoProps {
    title: string;
    src: string;
}

export default function VideoPlayer({ title, caption, src }: VideoProps) {
    return (
        <div>       
            <video className="rounded-lg" width="320" height="240" controls preload="none">
                <source src={src} />
                Your browser does not support the video tag.
            </video>
            <h3 className="p-4 text-xl">{caption}</h3>
        </div>
    )
  }
