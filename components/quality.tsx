import Header from "@/components/header";
import Footer from "@/components/footer";

export default function QualityPage() {
  const products = [
    {
      name: "Groundnut",
      img: "/groundnut.png",
      description: "Premium quality groundnuts",
    },
    { name: "Rice", img: "/rice.png", description: "Finest varieties of rice" },
    {
      name: "Chillies",
      img: "/chillies.png",
      description: "Spicy and flavorful chillies",
    },
    {
      name: "Turmeric",
      img: "/turmeric.png",
      description: "Organic turmeric powder",
    },
    {
      name: "Cumin Seeds",
      img: "/cumin-seeds.avif",
      description: "Aromatic cumin seeds",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center border border-primary-100">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Quality You Can Trust
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Every product undergoes rigorous quality checks and is packaged with
          care to ensure freshness and longevity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          {products.map((product) => (
            <div
              key={product.name}
              className="group flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors duration-300">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {product.description}
              </p>
              {/* <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors">
                Learn More →
              </button> */}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-700">
            ✓ Direct from Farms
          </span>
          <span className="bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-700">
            ✓ Quality Certified
          </span>
          <span className="bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-700">
            ✓ Global Shipping
          </span>
        </div>
      </div>
    </section>
  );
}
