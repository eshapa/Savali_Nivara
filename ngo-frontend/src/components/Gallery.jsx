import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/1.jpg",
    "/images/22.jpeg",
    "/images/5.jpeg",
    "/images/6.jpeg"
  ];

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % images.length;
    setCurrentIndex(next);
    setSelectedImage(images[next]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prev);
    setSelectedImage(images[prev]);
  };

  return (
    <div className="bg-gray-50">

      {/* 🔹 TOP STORY SECTION (UPGRADED) */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <div className="relative group">
          <img
            src="/images/Man1.jpg"
            className="rounded-3xl shadow-xl w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Overlay effect */}
          <div className="absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition"></div>
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-2xl font-bold italic text-gray-800">
            "Success Stories: A Life Transformed"
          </h2>

          <p className="mt-6 text-gray-600 text-sm leading-relaxed">
            <span className="text-4xl float-left mr-3 font-serif text-green-700">S</span>
            unil Joshi, a 70-year-old man, met with a serious accident in Pune.
            He was admitted to YCM Hospital, where he remained unconscious for nearly 8 months.
            During this difficult period, the team from <b>Real Life Real People</b> NGO
            took responsibility for his care and support.
            <br /><br />
            After recovery, he was shifted to <b>Sawli Nivara Kendra</b>,
            where he was cared for and slowly regained independence.
            <br /><br />
            With continuous support, treatment, and dedication,
            he is now living a <span className="text-green-700 font-semibold">stable and dignified life</span>.
          </p>
        </div>

      </section>

      {/* 🔹 HEADING */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-green-800 tracking-wide">
          MAKING HEADLINES: OUR GLOBAL IMPACT
        </h2>
        <p className="text-gray-400 text-xs mt-2 tracking-widest">
          JOURNEY IN THE PRESS
        </p>
      </section>

      {/* 🔹 GALLERY GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 gap-6">

          {images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-xl shadow-lg group">
              <img
                src={img}
                onClick={() => openImage(i)}
                className="w-full h-[280px] object-cover cursor-pointer group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}

        </div>

      </section>

      {/* 🔹 LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <X
            onClick={closeImage}
            className="absolute top-6 right-6 text-white cursor-pointer"
            size={32}
          />

          <ChevronLeft
            onClick={prevImage}
            className="absolute left-6 text-white cursor-pointer"
            size={40}
          />

          <img
            src={selectedImage}
            className="max-w-4xl w-full rounded-xl"
          />

          <ChevronRight
            onClick={nextImage}
            className="absolute right-6 text-white cursor-pointer"
            size={40}
          />
        </div>
      )}

    </div>
  );
}

export default Gallery;