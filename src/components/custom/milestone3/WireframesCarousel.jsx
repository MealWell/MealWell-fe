import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ResponsiveCarouselControls from "@/components/ui/responsive-carousel-controls.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";

const images = [
  {
    src: "wireframes/7_sign_up.jpg",
    alt: "Sign up mockup",
    description: "Înregistrarea utilizatorilor în aplicația MealWell.",
  },
  {
    src: "wireframes/6_sign_in.jpg",
    alt: "Sign in mockup",
    description: "Autentificarea utilizatorilor în aplicația MealWell.",
  },
  {
    src: "wireframes/1_choose_your_plan.jpg",
    alt: "Choose your plan mockup",
    description:
      "Primul pas în crearea unui abonament: selectarea planului, zilelor de abonament și preferințele dietare.",
  },
  {
    src: "wireframes/2_customize_menu.jpg",
    alt: "Customize your menu mockup",
    description:
      "Personalizarea meniului: se aleg preferințele de gust, alergenii (daca există). Opțional se pot introduce obiective de calorii și nutrienți. De asemenea, utilizatorul poate selecta varietatea meselor.",
  },
  {
    src: "wireframes/3_delivery_setup.jpg",
    alt: "Delivery setup mockup",
    description:
      "Configurarea livrării, ce presupune introducerea: adresei, numelui, numărului de telefon, zilelor de livrare. Utilizatorul obține un sumar al abonamentului, acesta fiind ultimul pas în selectarea abonamentului.",
  },
  {
    src: "wireframes/4_manage_subscription.jpg",
    alt: "Manage subscription mockup",
    description:
      "Meniu de gestionare al abonamentului utilizatorului. Aici se pot modifica datele de livrare, preferințele dietice, obiective ș.a.",
  },
  {
    src: "wireframes/5_dashboard.jpg",
    alt: "User dashboard mockup",
    description:
      "Dashboard-ul, sau profilul utilizatorului. Aici utilizatorul poate vedea detalii despre masa pe ziua curentă, tipul abonamentului, detalii despre livrări viitoare și mesele curente conform abonamentului.",
  },
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [api, setApi] = React.useState(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="relative">
        <Carousel className="relative" setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <Dialog className="md:max-w-[90dvw] md:max-h-[90dvh]">
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="object-contain w-full h-full"
                        />
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className={"max-w-[90%] max-h-[90%] p-0"}>
                    <DialogTitle className="sr-only">Wireframe</DialogTitle>
                    <DialogDescription className="sr-only">
                      Wireframe
                    </DialogDescription>
                    <div className={"max-w-[90vw] max-h-[90vh] p-0"}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <ResponsiveCarouselControls />
        </Carousel>
      </div>
      <div className="mt-4 text-center p-4 bg-gray-100 rounded-md">
        <p>{images[currentIndex].description}</p>
      </div>
    </div>
  );
}
