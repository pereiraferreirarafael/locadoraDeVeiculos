import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Breadcrumbs, CategoryCard, Header } from '~/components';
import { api } from '~/services/api.server';

export async function loader({ request }: LoaderFunctionArgs) {
	try {
		const [categories, cars] = await Promise.all([api.getCategory(), api.getCars()]);

		const categoriesWithCarCount = categories.map((category) => ({
			...category,
			carCount: cars.filter((car) => String(car.categoryId) === String(category.id)).length,
		}));

		return categoriesWithCarCount;
	} catch (error) {
		if (error instanceof Response) throw error;
		throw new Response('Erro ao buscar categorias', { status: 500 });
	}
}

export default function CategoriesRoute() {
	const categories = useLoaderData<typeof loader>();

	return (
		<div className='min-h-screen bg-neutral-background'>
			<Header />
			<Breadcrumbs items={[{ label: 'Categorias' }]} />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Header Section */}
				<div className='mb-12'>
					<h1 className='font-heading text-heading-xl lg:text-heading-xxl text-neutral-black mb-4'>
						Escolha por Categoria
					</h1>
					<p className='text-body-lg text-neutral-text max-w-3xl'>
						Encontre o carro perfeito para sua necessidade. Navegue pelas categorias e descubra
						nossa frota completa de veículos disponíveis para locação.
					</p>
				</div>

				{/* Categories Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
					{categories.map((category) => (
						<CategoryCard
							key={category.id}
							id={Number(category.id)}
							title={category.title}
							description={category.description}
							carCount={category.carCount}
						/>
					))}
				</div>

				{/* Info Section */}
				<div className='mt-16 bg-primary-light/30 rounded-lg p-8'>
					<h2 className='font-heading text-heading-md text-neutral-black mb-4'>
						Não encontrou o que procura?
					</h2>
					<p className='text-body-md text-neutral-text mb-6'>
						Entre em contato conosco! Nossa equipe está pronta para ajudá-lo a encontrar o veículo
						ideal para suas necessidades específicas.
					</p>
					<button className='bg-primary-pure hover:bg-primary-dark text-neutral-white font-medium px-6 py-3 rounded-lg transition-colors'>
						Falar com um especialista
					</button>
				</div>
			</div>
		</div>
	);
}
