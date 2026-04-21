import { Link, Form } from 'react-router';
import { MdSearch, MdCategory } from 'react-icons/md';

export function Header() {
	return (
		<header className='bg-neutral-white border-b border-neutral-divisor'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4'>
				<div className='flex flex-col md:flex-row items-center gap-3 md:gap-4 lg:gap-8'>
					{/* Logo */}
					<Link to='/' className='flex-shrink-0'>
						<img
							src='/logo-light.png'
							alt='Hermex'
							className='h-6 lg:h-8 cursor-pointer hover:opacity-80 transition-opacity'
						/>
					</Link>

					{/* Search Bar */}
					<Form method='get' action='/search' className='w-full md:flex-1 md:max-w-2xl'>
						<div className='relative'>
							<input
								type='text'
								name='q'
								placeholder='O que você procura?'
								className='w-full px-4 py-2 text-body-sm sm:text-body-md border border-neutral-divisor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-pure focus:border-transparent'
							/>
							<button
								type='submit'
								className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-text hover:text-primary-pure transition-colors'
								aria-label='Buscar'
							>
								<MdSearch className='w-5 h-5' />
							</button>
						</div>
					</Form>

					{/* Categories Link */}
					<Link
						to='/categories'
						className='flex items-center gap-2 text-body-md font-medium text-neutral-text hover:text-primary-pure transition-colors'
					>
						<MdCategory className='w-5 h-5' />
						<span className='hidden sm:inline'>Categorias</span>
					</Link>
				</div>
			</div>
		</header>
	);
}
