// "use client";
// import { time } from "console";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function Landing() {
//   const imageArray: string[] = [
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//     "/gambar_lanfing.jpg",
//   ];

//   //   images.map((value: string, index: number) => {
//   //     if (index % 5 === 0) {
//   //       // Melakukan sesuatu jika num adalah kelipatan 5
//   //       console.log(`-------------------------------`);
//   //       // Anda bisa menambahkan logika lain di sini
//   //     }
//   //     console.log(value);
//   //   });
//   const numberOfGroups = Math.ceil(imageArray.length / 5);
//   const [images, setImages] = useState([]);

//   // Mengisi state dengan gambar dan memberikan jeda
//   useEffect(() => {
//     // const imageArray = [
//     //   /* array gambar Anda di sini */
//     // ];

//     const loadImages = () => {
//       // Menggunakan setTimeout untuk memberi jeda
//       imageArray.forEach((img, index) => {
//         setTimeout(() => {
//           setImages((prevImages) => [...prevImages, img]);
//         }, 40 * index); // Jeda 50ms untuk setiap gambar
//       });
//     };

//     loadImages();
//   }, []);
//   return (
//     <div className="grid grid-cols-7 gap-2 w-fit m-10">
//       {Array.from({ length: numberOfGroups }, (_, groupIndex) => (
//         <div className="grid grid-rows-5 gap-2" key={`group-${groupIndex}`}>
//           {images
//             .slice(groupIndex * 5, groupIndex * 5 + 5)
//             .map((img, imgIndex) => (
//               <img
//                 key={imgIndex}
//                 src={img}
//                 alt={`Image ${imgIndex}`}
//                 className="w-20 h-20 object-cover animate-fade bg-black"
//               />
//             ))}
//         </div>
//       ))}
//     </div>
//     // <div className="grid grid-cols-7 gap-2 w-fit">
//     //   {t.map((column, colIndex) => (
//     //     <div key={colIndex} className="grid grid-rows-5 gap-2">
//     //       {t.map((image, rowIndex) => (
//     //         <img
//     //           key={rowIndex}
//     //           src={image}
//     //           alt={`Image ${colIndex * 5 + rowIndex + 1}`}
//     //           className="w-20 h-20 object-cover animate-fade bg-black"
//     //         />
//     //       ))}
//     //     </div>
//     //   ))}
//     // </div>
//     // <div className="grid grid-cols-7 gap-2 w-fit">
//     //   <div className="grid grid-rows-5 gap-2">
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //   </div>
//     //   <div className="grid grid-rows-5 gap-2">
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //   </div>
//     //   <div className="grid grid-rows-5 gap-2">
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //   </div>
//     //   <div className="grid grid-rows-5 gap-2">
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //   </div>
//     //   <div className="grid grid-rows-5 gap-2">
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //   </div>
//     //   <div className="grid grid-rows-5 gap-2">
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //   </div>
//     //   <div className="grid grid-rows-5 gap-2">
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //     <div className="size-20 bg-black"></div>
//     //   </div>
//     // </div>
//   );
// }
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Pinterest Clone</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  Sign Up
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100">
        <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/400"
              alt="Pin 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Inspiration 1</h3>
              <p className="text-gray-600">Description of inspiration 1.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/400"
              alt="Pin 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Inspiration 2</h3>
              <p className="text-gray-600">Description of inspiration 2.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/400"
              alt="Pin 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Inspiration 3</h3>
              <p className="text-gray-600">Description of inspiration 3.</p>
            </div>
          </div>
          {/* Tambahkan lebih banyak item pin sesuai kebutuhan */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            © 2024 Pinterest Clone. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
