"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const updateProduct = async (product, id) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/admin/products/${id}`,
        product
      );

      if (data) {
        setUpdated(true);
        router.replace(`/admin/products/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const newProduct = async (product) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/admin/products`,
        product
      );

      if (data) {
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const uploadProductImages = async (formData, id) => {
  console.log("okay c 1");

    try {
  console.log("okay c 2");

      setLoading(true);

  console.log("okay c 3");

      const { data } = await axios.post(
        
        `${process.env.API_URL}/api/admin/products/upload_images/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  console.log("okay c 4");


      if (data?.data) {
  console.log("okay c 5");

        setLoading(false);
        router.replace("/admin/products");
      }
  console.log("okay c 6");

    } catch (error) {
  console.log("okay error c 1");

      setLoading(false)
      setError(error?.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/admin/products/${id}`
      );

      if (data?.success) {
        router.replace(`/admin/products`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const postReview = async (reviewData) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/products/review`,
        reviewData
      );

      if (data?.success) {
        router.replace(`/product/${reviewData?.productId}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,
        uploadProductImages,
        updateProduct,
        deleteProduct,
        postReview,

        clearErrors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
