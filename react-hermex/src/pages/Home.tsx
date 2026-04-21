import { Header, SearchBox, CarCard, CarCardSkeleton, Banner } from '../components';
import { useCars } from '../contexts/CarsContext';

export function Home() {
  const { cars, loading, error } = useCars();

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <SearchBox />
      <Banner />

      {/* Car Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-heading text-heading-lg text-neutral-black mb-8">
          Carros Disponíveis
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-body-md text-feedback-negative">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.slice(0, 6).map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                title={car.title}
                shortTitle={car.shortTitle}
                price={car.price}
                image={car.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
