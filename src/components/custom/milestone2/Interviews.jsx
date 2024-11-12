import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { Button } from "@/components/ui/button.jsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import { gradientClassNames } from "@/styles/gradient.js";
import { TypographyH3 } from "@/components/custom/typography/TypographyH3.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx";
import ResponsiveCarouselControls from "@/components/ui/responsive-carousel-controls.jsx";

const interviews = [
  {
    interviewee: "Liviu",
    picture: "interviews/interviewees/liviu.jpg",
    interviewSrc:
      "https://drive.google.com/file/d/16r6m0RWfY1dAqL06Oc4uGky22-RhKVYM/preview",
  },
  {
    interviewee: "Veaceslav",
    picture: "interviews/interviewees/veaceslav.jpg",
    interviewSrc:
      "https://drive.google.com/file/d/1rM7-tg2bnfW2py2JYytp5_uNcjW1UB71/preview",
  },
  {
    interviewee: "Maria",
    picture: "interviews/interviewees/sample_f.jpg",
    interviewSrc:
      "https://drive.google.com/file/d/1tnkafbMWLw6rGXoHNPF0eDWuENVCjPD2/preview",
  },
];

export default function Interviews() {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <TypographyH3 className={`${gradientClassNames}`}>
        Interviuri cu clienții
      </TypographyH3>
      <div className={"flex flex-col items-center"}>
        <Carousel
          className="max-w-sm w-full"
          opts={{
            align: "start",
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {interviews.map((interview, index) => (
              <CarouselItem key={index} className={""}>
                <div className="flex flex-col max-w-sm items-center">
                  <Avatar className={"size-16 xl:size-24 mb-2"}>
                    <AvatarImage
                      className="object-cover"
                      src={interview.picture}
                      alt={interview.interviewee}
                    />
                    <AvatarFallback>
                      <span className="text-3xl">{interview.interviewee}</span>
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant={
                      selectedInterview === interview ? "primary" : "outline"
                    }
                    onClick={() => setSelectedInterview(interview)}
                    disabled={selectedInterview === interview}
                  >
                    {interview.interviewee}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <ResponsiveCarouselControls />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Intervievatul {current} din {count} (glisează)
        </div>
      </div>

      {/* Videoclipul selectat */}
      {selectedInterview && (
        <div className={"xl:px-32"}>
          <div
            className={"mt-8 flex justify-center aspect-square md:aspect-video"}
          >
            <iframe
              src={selectedInterview.interviewSrc}
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
