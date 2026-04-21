import { useParams } from 'react-router-dom';
import { Header, Breadcrumbs } from '../components';
import { useCars } from '../contexts/CarsContext';
import { useCategories } from '../contexts/CategoriesContext';
import { MdPeople, MdSettings, MdLocalGasStation, MdCalendarToday, MdLuggage, MdCheckCircle, MdCheck, MdSecurity, MdAccessTime, MdLocationOn } from 'react-icons/md';

export function Detail() {
	const { id } = useParams<{ id: string }>();
	const { getCarById, loading: carsLoading } = useCars();
	const { getCategoryById, loading: categoriesLoading } = useCategories();

	const loading = carsLoading || categoriesLoading;
	const car = getCarById(Number(id));
	const category = car ? getCategoryById(car.categoryId) : null;

	if (loading) {
		return (
			<div className='min-h-screen bg-neutral-background'>
				<Header />
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					<div className='text-center'>
						<p className='text-body-md text-neutral-text'>Carregando...</p>
					</div>
				</div>
			</div>
		);
	}

	if (!car) {
		return (
			<div className='min-h-screen bg-neutral-background'>
				<Header />
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					<div className='text-center'>
						<h1 className='font-heading text-heading-xl text-neutral-black mb-4'>
							Veículo não encontrado
						</h1>
						<p className='text-body-md text-neutral-text'>
							O veículo que você procura não está disponível.
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Fallback para dados legados sem specs/features
	const specs = car.specs || {
		passengers: 5,
		transmission: 'Automático',
		fuel: 'Flex',
		year: 2024,
		airConditioning: true,
		trunk: '300L',
	};

	const features = car.features || [
		'Ar condicionado',
		'Direção elétrica',
		'Vidros elétricos',
		'Travas elétricas',
		'Airbags',
		'Freios ABS',
	];

	return (
		<div className='min-h-screen bg-neutral-background'>
			<Header />
			<Breadcrumbs items={[{ label: 'Carros', path: '/' }, { label: car.title }]} />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Column - Details */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Car Info with Image */}
						<div className='bg-neutral-white rounded-lg shadow-elevation-1 p-6 lg:p-8'>
							<div className='flex flex-col md:flex-row gap-6 mb-6'>
								{/* Image - Smaller */}
								<div className='md:w-64 flex-shrink-0'>
									<div className='bg-neutral-divisor rounded-lg p-4'>
										<img
											src={car.image}
											alt={car.title}
											className='w-full h-auto object-contain max-h-[180px]'
											style={{ imageRendering: 'auto' }}
										/>
									</div>
								</div>

								{/* Info */}
								<div className='flex-1'>
									<span className='inline-block bg-primary-light text-primary-pure text-body-sm font-medium px-3 py-1 rounded-full mb-3'>
										{category?.title || 'Carro'}
									</span>
									<h1 className='font-heading text-heading-lg lg:text-heading-xl text-neutral-black mb-3'>
										{car.title}
									</h1>
									<p className='text-body-md text-neutral-text leading-relaxed'>
										{car.description}
									</p>
								</div>
							</div>
						</div>

						{/* Specifications */}
						<div className='bg-neutral-white rounded-lg shadow-elevation-1 p-6 lg:p-8'>
							<h2 className='font-heading text-heading-md text-neutral-black mb-6'>
								Especificações
							</h2>

							<div className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0'>
										<MdPeople className='w-5 h-5 text-primary-pure' />
									</div>
									<div>
										<p className='text-body-xs text-neutral-text'>Passageiros</p>
										<p className='font-medium text-body-md text-neutral-black'>
											{specs.passengers}
										</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='w-10 h-10 bg-secondary-light/20 rounded-lg flex items-center justify-center flex-shrink-0'>
										<MdSettings className='w-5 h-5 text-secondary-pure' />
									</div>
									<div>
										<p className='text-body-xs text-neutral-text'>Transmissão</p>
										<p className='font-medium text-body-md text-neutral-black'>
											{specs.transmission}
										</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='w-10 h-10 bg-feedback-positive/20 rounded-lg flex items-center justify-center flex-shrink-0'>
										<MdLocalGasStation className='w-5 h-5 text-feedback-positive' />
									</div>
									<div>
										<p className='text-body-xs text-neutral-text'>Combustível</p>
										<p className='font-medium text-body-md text-neutral-black'>{specs.fuel}</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0'>
										<MdCalendarToday className='w-5 h-5 text-primary-pure' />
									</div>
									<div>
										<p className='text-body-xs text-neutral-text'>Ano</p>
										<p className='font-medium text-body-md text-neutral-black'>{specs.year}</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='w-10 h-10 bg-secondary-light/20 rounded-lg flex items-center justify-center flex-shrink-0'>
										<MdLuggage className='w-5 h-5 text-secondary-pure' />
									</div>
									<div>
										<p className='text-body-xs text-neutral-text'>Porta-malas</p>
										<p className='font-medium text-body-md text-neutral-black'>{specs.trunk}</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='w-10 h-10 bg-feedback-positive/20 rounded-lg flex items-center justify-center flex-shrink-0'>
										<MdCheckCircle className='w-5 h-5 text-feedback-positive' />
									</div>
									<div>
										<p className='text-body-xs text-neutral-text'>Ar condicionado</p>
										<p className='font-medium text-body-md text-neutral-black'>
											{specs.airConditioning ? 'Sim' : 'Não'}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Features */}
						<div className='bg-neutral-white rounded-lg shadow-elevation-1 p-6 lg:p-8'>
							<h2 className='font-heading text-heading-md text-neutral-black mb-6'>
								Características
							</h2>

							<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
								{features.map((feature: string, index: number) => (
									<div key={index} className='flex items-center gap-2'>
										<MdCheck className='w-5 h-5 text-feedback-positive flex-shrink-0' />
										<span className='text-body-sm text-neutral-text'>{feature}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column - Booking Card */}
					<div className='lg:col-span-1'>
						<div className='bg-neutral-white rounded-lg shadow-elevation-2 p-6 sticky top-4'>
							<div className='mb-6'>
								<p className='text-body-sm text-neutral-text mb-2'>Diária a partir de</p>
								<div className='flex items-baseline gap-2'>
									<span className='font-heading text-heading-xl text-primary-pure'>
										R${car.price}
									</span>
									<span className='text-body-md text-neutral-text'>/dia</span>
								</div>
							</div>

							<div className='space-y-4 mb-6'>
								<div>
									<label className='block text-body-sm font-medium text-neutral-black mb-2'>
										Local de retirada
									</label>
									<input
										type='text'
										placeholder='Digite o local'
										className='w-full px-4 py-3 border border-neutral-divisor rounded-lg text-body-md focus:outline-none focus:ring-2 focus:ring-primary-pure focus:border-transparent'
									/>
								</div>

								<div>
									<label className='block text-body-sm font-medium text-neutral-black mb-2'>
										Data de retirada
									</label>
									<input
										type='date'
										className='w-full px-4 py-3 border border-neutral-divisor rounded-lg text-body-md focus:outline-none focus:ring-2 focus:ring-primary-pure focus:border-transparent'
									/>
								</div>

								<div>
									<label className='block text-body-sm font-medium text-neutral-black mb-2'>
										Data de devolução
									</label>
									<input
										type='date'
										className='w-full px-4 py-3 border border-neutral-divisor rounded-lg text-body-md focus:outline-none focus:ring-2 focus:ring-primary-pure focus:border-transparent'
									/>
								</div>
							</div>

							<button className='w-full bg-primary-pure hover:bg-primary-dark text-neutral-white font-medium py-4 rounded-lg transition-colors text-body-md mb-4'>
								Reservar agora
							</button>

							<p className='text-body-xs text-neutral-text text-center'>
								Cancelamento grátis até 24h antes da retirada
							</p>

							{/* Info Cards */}
							<div className='mt-6 pt-6 border-t border-neutral-divisor space-y-3'>
								<div className='flex items-start gap-3'>
									<MdSecurity className='w-5 h-5 text-feedback-positive flex-shrink-0 mt-0.5' />
									<div>
										<p className='text-body-sm font-medium text-neutral-black'>Seguro incluso</p>
										<p className='text-body-xs text-neutral-text'>Proteção total do veículo</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<MdAccessTime className='w-5 h-5 text-feedback-positive flex-shrink-0 mt-0.5' />
									<div>
										<p className='text-body-sm font-medium text-neutral-black'>Suporte 24h</p>
										<p className='text-body-xs text-neutral-text'>Atendimento a qualquer hora</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<MdLocationOn className='w-5 h-5 text-feedback-positive flex-shrink-0 mt-0.5' />
									<div>
										<p className='text-body-sm font-medium text-neutral-black'>Entrega flexível</p>
										<p className='text-body-xs text-neutral-text'>Retire onde preferir</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
