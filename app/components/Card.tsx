"use client";

import Link from "next/link"; 
import React, { useEffect, useState } from "react";
import AutoComplete from "./AutoComplete";
import CategoryFilter from "./CategoryFilter";

const Card = () => {
  const [products, setProducts] = useState<{ id: number; title: string; category: string; description: string }[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<{ id: number; title: string; category: string; description: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/dummy.json");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = Array.from(new Set(data.map((p: any) => p.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Ürünler alınamadı:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };


  const handleFilterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    if (!category) {
      setFilteredProducts(products); 
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };
  
  return (
    <div>
    <div className="p-6 bg-gray-50 min-h-screen hidden md:block">
    <div className=" mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <AutoComplete onSearch={handleSearch} />
        <CategoryFilter categories={categories} onFilter={handleFilterByCategory} />
      </div>
  
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ürün Listesi</h2>
  
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3 text-sm font-semibold text-gray-600">ID</th>
              <th className="border border-gray-300 p-3 text-sm font-semibold text-gray-600">Title</th>
              <th className="border border-gray-300 p-3 text-sm font-semibold text-gray-600">Description</th>
              <th className="border border-gray-300 p-3 text-sm font-semibold text-gray-600">Category</th>
              <th className="border border-gray-300 p-3 text-sm font-semibold text-gray-600">Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="text-gray-700 border-b border-gray-200">
                <td className="border border-gray-300 p-3 text-center">{product.id}</td>
                <td className="border border-gray-300 p-3">{product.title}</td>
                <td className="border border-gray-300 p-3">{product.description}</td>
                <td className="border border-gray-300 p-3 text-center">{product.category}</td>
                <td className="border border-gray-300 p-3 text-center">
                  <Link href={`/products/${product.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                      İçerik Detayı
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="hidden max-[768px]:block p-5 flex flex-col gap-4">
  <div className="mb-6">
        <AutoComplete onSearch={handleSearch} />
        <CategoryFilter categories={categories} onFilter={handleFilterByCategory} />
      </div>
  {filteredProducts.map((product) => (
    <div key={product.id} className=" border border-gray-300 rounded-lg p-4 bg-white shadow-md gap-4">
      <div className="grid grid-cols-2 gap-4">
        <span className="font-semibold text-gray-600">ID:</span>
        <span>{product.id}</span>

        <span className="font-semibold text-gray-600">Title:</span>
        <span>{product.title}</span>

        <span className="font-semibold text-gray-600">Description:</span>
        <span>{product.description}</span>

        <span className="font-semibold text-gray-600">Category:</span>
        <span>{product.category}</span>

        <span className="font-semibold text-gray-600">Link:</span>
        <span>
          <Link href={`/products/${product.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              İçerik Detayı
            </button>
          </Link>
        </span>
      </div>
    </div>
  ))}
</div>


  </div>
  
  );
};

export default Card;
