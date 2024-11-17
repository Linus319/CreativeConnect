"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { PlayIcon, PauseIcon } from "lucide-react";

interface AudioPlayerProps {}

interface Track {
    imageUrl: string;
    title: string;
    src: string;
}


const AudioPlayer = ({ imageUrl, title, src }: Track) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current && src) {
            audioRef.current.src = src;
            audioRef.current.load();
        }
    }, [src]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setProgress(
                (audioRef.current.currentTime / audioRef.current.duration) * 100
            );
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    };

    return (
        <div className="relative w-full h-full">
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            {isPlaying ? 
                <div className="max-w-md w-full space-y-4">
                    <div className="absolute inset-0 flex justify-center items-center text-white">
                        <button onClick={handlePlayPause} className="p-4 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors opacity-50">
                            <PauseIcon className="w-6 h-6" />
                        </button>

                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className="mx-4 text-xl font-bold">{title}</h1>
                    </div>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
                            <Image 
                                src={imageUrl}
                                alt="Audio artwork"
                                width={200}
                                height={200}
                                className=""
                            />
                        <div className="w-full">
                            <Progress value={progress} />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                            
                        </CardContent>
                    </Card>
                </div>

                :
                
                <div className="relative w-full h-full">
                    {imageUrl === "/images/default-audio-image.png" ? 
                    <div className="flex justify-center items-center w-full h-full bg-gray-500 rounded-lg">
                        <Image
                            src={imageUrl}
                            alt={`Image for ${title}`}
                            width={100}
                            height={100}
                            className="object-contain" 
                        />
                        <div className="absolute inset-0 flex justify-center items-center text-white">
                            <button onClick={handlePlayPause} className="p-4 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors opacity-50">
                                <PlayIcon className="w-6 h-6" />
                            </button>
                            <div className="">
                                <p className="absolute bottom-4 text-2xl ">{title}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="relative w-full h-full bg-gray-500 rounded-lg">
                        <Image
                            className="rounded-lg bg-gray-500"
                            src={imageUrl}
                            alt={`Image for ${title}`}
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="absolute inset-0 flex justify-center items-center text-white">
                            <button
                                onClick={handlePlayPause}
                                className="p-4 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors opacity-50">
                                <span className="text-3xl">▶</span>
                            </button>
                            <div className="">
                                <p className="absolute bottom-4 text-2xl">{title}</p>
                            </div>
                        </div>
                    </div>}
                </div>
            }
            
        </div>
    )
};


export default AudioPlayer;
