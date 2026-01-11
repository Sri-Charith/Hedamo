import { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, STATUSES } from './data';
import './index.css';

// Helper for date formatting
const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString));
};

const getStatusStyles = (status) => {
  switch (status) {
    case 'Draft': return 'status-badge-draft';
    case 'Submitted': return 'status-badge-submitted';
    case 'Published': return 'status-badge-published';
    default: return 'status-badge-draft';
  }
};

const ProductCard = ({ product, onSelect }) => {
  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300 cursor-pointer interactive-ring"
      onClick={() => onSelect(product)}
      tabIndex="0"
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(product);
        }
      }}
    >
      <div className="flex flex-col gap-4 h-full">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>

        <p className="text-sm text-gray-500 mt-auto">
          Producer disclosure by <span className="text-gray-900 font-medium">{product.producer}</span>
        </p>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className={`status-badge ${getStatusStyles(product.status)}`}>
            {product.status}
          </span>
          <span className="text-xs text-gray-400">
            Updated {formatDate(product.lastUpdated)}
          </span>
        </div>
      </div>
    </div>
  );
};

const SkeletonDetail = () => (
  <div className="max-w-[1000px] mx-auto animate-pulse">
    <div className="h-4 w-32 bg-gray-200 rounded mb-8"></div>
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div className="space-y-3">
        <div className="h-8 w-64 bg-gray-200 rounded"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="h-[200px] bg-gray-200 rounded-xl"></div>
        <div className="h-[250px] bg-gray-200 rounded-xl"></div>
      </div>
      <div className="space-y-6">
        <div className="h-[120px] bg-gray-200 rounded-xl"></div>
        <div className="h-[180px] bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const ProductDetail = ({ product, onBack }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [product.id]);

  if (loading) return <SkeletonDetail />;

  const mockExtendedData = {
    declarationDate: product.lastUpdated,
    evidenceCount: (product.id.length % 3) + 1,
    history: [
      { version: 'v1.2', date: product.lastUpdated, status: product.status },
      { version: 'v1.1', date: '2025-01-15T09:00:00Z', status: 'Submitted' },
      { version: 'v1.0', date: '2024-12-01T14:20:00Z', status: 'Draft' },
    ]
  };

  return (
    <div className="max-w-[1000px] mx-auto animate-fade-in-up">
      <button
        onClick={onBack}
        className="mb-8 flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 group interactive-ring rounded-lg px-2 -ml-2 py-1"
      >
        <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">←</span>
        Back to Registry
      </button>

      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              {product.name}
            </h1>
            <span className={`status-badge ${getStatusStyles(product.status)}`}>
              {product.status}
            </span>
          </div>
          <p className="text-base text-gray-500">
            {product.category} • <span className="text-gray-900">Declared by {product.producer}</span>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Disclosure Summary Card */}
          <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-base font-medium text-gray-900">Disclosure Summary</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: 'Declared by', value: product.producer },
                { label: 'Declaration date', value: formatDate(mockExtendedData.declarationDate) },
                { label: 'Evidence attached', value: `${mockExtendedData.evidenceCount} documents provided`, interactive: true },
                { label: 'Responsibility', value: 'Producer-reported information provided as-is.', muted: true },
              ].map((item, idx) => (
                <div key={idx} className={`space-y-1 ${item.interactive ? 'group cursor-pointer' : ''}`}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className={`text-sm ${item.muted ? 'text-gray-500 font-normal italic' : 'text-gray-900 font-medium'} ${item.interactive ? 'text-blue-600 group-hover:text-blue-700 transition-colors' : ''}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Version History */}
          <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-base font-medium text-gray-900">Version History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Version</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockExtendedData.history.map((v, i) => (
                    <tr key={i} className="group hover:bg-gray-50 transition-colors duration-150 cursor-default">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{v.version}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(v.date)}</td>
                      <td className="px-6 py-4">
                        <span className={`status-badge opacity-90 transition-opacity group-hover:opacity-100 ${getStatusStyles(v.status)}`}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar / Disclaimer */}
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 transition-colors duration-200 hover:bg-gray-100/50">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">Registry Disclaimer</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  This page presents producer-declared information; it is not certification or verification.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border border-gray-200 rounded-xl space-y-4 bg-white shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">Required Disclosures</h3>
            <ul className="space-y-3">
              {['Safety documentation', 'Environmental impact', 'Supply chain origin'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600 group cursor-default p-1 -m-1 rounded hover:bg-gray-50 transition-colors">
                  <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <svg className="w-2.5 h-2.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 h-[180px] animate-pulse">
    <div className="space-y-2">
      <div className="h-5 w-2/3 bg-gray-100 rounded"></div>
      <div className="h-4 w-1/3 bg-gray-100 rounded"></div>
    </div>
    <div className="mt-auto h-4 w-1/2 bg-gray-100 rounded"></div>
    <div className="pt-4 border-t border-gray-100 flex justify-between">
      <div className="h-5 w-20 bg-gray-100 rounded-full"></div>
      <div className="h-3 w-24 bg-gray-100 rounded"></div>
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.producer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'updated') {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      return 0;
    });

    return result;
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  if (selectedProduct) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Product Registry
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Access producer-declared disclosures for registered healthcare products.
          Information is provided as-is, declared by producers.
        </p>
      </header>

      <section className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label htmlFor="search" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Search Disclosures
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by product name or producer..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm interactive-ring focus:border-blue-600 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6 lg:items-end">
            <div className="min-w-[140px]">
              <label htmlFor="category" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                id="category"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm cursor-pointer outline-none focus:border-blue-600 transition-colors duration-200 interactive-ring"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="min-w-[140px]">
              <label htmlFor="status" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Disclosure Status
              </label>
              <select
                id="status"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm cursor-pointer outline-none focus:border-blue-600 transition-colors duration-200 interactive-ring"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="min-w-[160px]">
              <label htmlFor="sort" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Sort Results
              </label>
              <select
                id="sort"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm cursor-pointer outline-none focus:border-blue-600 transition-colors duration-200 interactive-ring"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name (A–Z)</option>
                <option value="updated">Recently Updated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <main>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 border-dashed rounded-xl py-12 px-6 text-center animate-fade-in-up">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">No disclosures match your search</h3>
            <p className="text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed">
              Try adjusting your filters or searching for another product name or producer.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
