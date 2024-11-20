interface VideoProps {
    title: string;
    src: string;
}

export default function VideoPlayer({ title, src }: VideoProps) {
    return (
        <div>       
            <video className="rounded-lg" width="320" height="240" controls preload="none">
                <source src={src} />
                Your browser does not support the video tag.
            </video>
            <h1 className="p-4 text-xl">{title}</h1>
        </div>
    )
  }