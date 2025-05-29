import Image from "next/image";
import { VideoText } from "@/components/magicui/video-text";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-black">
      <div className="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
        <VideoText
          src="https://res.cloudinary.com/dqlzpikl5/video/upload/v1748492782/krheq8y5vasm7t310wrf.mp4"
          fontSize="8vw" 
          className="w-full h-full"
        >
          NBA Live Scores
        </VideoText>
      </div>
    </main>
  );
}