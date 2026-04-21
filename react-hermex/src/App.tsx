import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Search, Categories, CategoryDetail, Detail } from './pages';
import { CarsProvider } from './contexts/CarsContext';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { ErrorBoundary } from './components';

function App() {
	return (
		<ErrorBoundary>
			<BrowserRouter>
				<CategoriesProvider>
					<CarsProvider>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/search" element={<Search />} />
							<Route path="/categories" element={<Categories />} />
							<Route path="/categories/:id" element={<CategoryDetail />} />
							<Route path="/car/:id" element={<Detail />} />
						</Routes>
					</CarsProvider>
				</CategoriesProvider>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
