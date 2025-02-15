"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  category:string;
}

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
    console.log("id:",id);
    
  useEffect(() => {
    const getProductById = async (id: string) => {
      try {
        const response = await fetch("http://localhost:3000/dummy.json"); 
        const products: Product[] = await response.json();        
        const selectedProduct = products.find((product) => product.id == Number(id));
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error("Ürün alınamadı:", error);
      }
    };

    if (id) getProductById(id);
  }, [id]);

  if (!product) return <p>Ürün bulunamadı</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
      <p className="text-lg font-medium text-blue-600 mb-2">{product.category}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      </div>
  </div>
  
  );
};

export default ProductDetailPage;
