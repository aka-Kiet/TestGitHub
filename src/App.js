import './App.css';
import { ProductsProvider } from './context/ProductsContext';
import ProductsManagement from './page/ProductsManagement';

function App() {
  return (
    <ProductsProvider>
      <div className="App">
        <ProductsManagement />
      </div>
    </ProductsProvider>
  );
}

export default App;