import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Banner, CarCard, Header, SearchBox } from '~/components';
import { api } from '~/services/api.server';

export async function loader({ request }: LoaderFunctionArgs) {
	try {
		const cars = await api.getCars();
		return cars.slice(0, 6);
	} catch (error) {
		if (error instanceof Response) throw error;
		throw new Response('Erro ao buscar veículos', { status: 500 });
	}
}

export default function IndexRoute() {
	const cars = useLoaderData<typeof loader>();

	return (
		<div className='min-h-screen bg-neutral-background'>
			<Header />
			<SearchBox />
			<Banner />

			{/* Car Cards Grid */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<h2 className='font-heading text-heading-lg text-neutral-black mb-8'>Carros Disponíveis</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{cars.map((car) => (
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
			</div>
		</div>
	);
}
