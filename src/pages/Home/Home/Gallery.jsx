import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800",
  "https://plus.unsplash.com/premium_photo-1661670219639-2ea9af8e9d88?w=800",
  "https://images.unsplash.com/photo-1459183885421-5cc683b8dbba?w=800",
  "https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?w=800",
  "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800",
  "https://images.unsplash.com/photo-1524565026928-7c62b93cf22c?w=800",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primaryColor mb-10">
          Donation Gallery
        </h2>

        {/* Masonry-style layout using grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className=" rounded-lg shadow-lg h-full cursor-pointer transition-transform hover:scale-95"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Gallery ${i}`}
                className="w-full h-full mb-4 object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Modal on image click */}
        {selectedImage && (
          <div
            className="fixed inset-0   bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
           <div className="lg:m-0 m-4">
             <img
              src={selectedImage}
              alt="Enlarged"
              className=" lg:max-w-3xl max-h-[90vh] rounded-lg border-4   border-white"
            />
           </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
