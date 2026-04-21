import { Link } from 'react-router-dom';
import { memo } from 'react';

interface CarCardProps {
  id: string | number;
  title: string;
  shortTitle: string;
  price: number;
  image: string;
}

export const CarCard = memo(function CarCard({ id, title, shortTitle, price, image }: CarCardProps) {
  return (
    <article className="bg-neutral-white rounded-lg shadow-elevation-1 overflow-hidden hover:shadow-elevation-2 transition-shadow">
      {/* Image */}
      <div className="bg-neutral-divisor p-6 flex items-center justify-center min-h-[200px]">
        <img
          src={image}
          alt={`${title} - Imagem do veículo`}
          className="w-full h-auto object-contain max-h-[180px]"
          style={{ imageRendering: 'auto' }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-heading font-semibold text-heading-xs text-neutral-black mb-1 line-clamp-2 min-h-[3rem]">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-body-md text-neutral-text mb-4">
          {shortTitle}
        </p>

        {/* Price */}
        <div className="mb-4" aria-label={`Preço: R$ ${price} por diária`}>
          <span className="font-heading font-bold text-heading-sm text-neutral-black">
            R${price}
          </span>
          <span className="text-body-md text-neutral-text">
            /diária
          </span>
        </div>

        {/* Button */}
        <Link
          to={`/car/${id}`}
          className="block w-full bg-primary-pure hover:bg-primary-dark text-neutral-white font-medium py-3 px-6 rounded-lg transition-colors text-body-md text-center focus:outline-none focus:ring-2 focus:ring-primary-pure focus:ring-offset-2"
          aria-label={`Ver detalhes do ${title}`}
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
});
