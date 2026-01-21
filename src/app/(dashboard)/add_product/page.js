"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import AdminRoute from "@/Wrapper/AdminRoute"

/* ===============================
   CATEGORY CONFIG
================================ */
const categoryMap = {
  Men: [],
  Women: ["Blouse", "Dress", "Saree"],
  Kids: [],
  Accessories: ["Bag", "Hair Band"],
  "Home Decor": [],
};

function AddProduct() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [parentCategory, setParentCategory] = useState("");
  const [images, setImages] = useState([]);

  /* ===============================
     IMAGE UPLOAD (IMGBB)
  ================================ */
  const uploadImagesToImgbb = async (files) => {
    const urls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      urls.push(data.data.url);
    }

    return urls;
  };

  /* ===============================
     SUBMIT HANDLER
  ================================ */
  const onSubmit = async (data) => {
  if (!data.category) {
    alert("Please select a sub category before submitting");
    return;
  }
  if (images.length === 0) {
    alert("Please upload at least one image");
    return;
  }
  const imageUrls = await uploadImagesToImgbb(images);
  const payload = {
    name: data.name,
    description: data.description,
    category: data.category,
    askingPrice: Number(data.askingPrice),
    mainPrice: Number(data.mainPrice),
    discount: Number(data.discount),
    images: imageUrls,
  };
  console.log("FINAL PRODUCT DATA:", payload);
  // ✅ API POST
  const res = await fetch("http://localhost:8080/addProducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    alert("Failed to add product");
    return;
  }
  alert("Product added successfully!");
};

  return (
    //  // <AdminRoute>
      <div className="container mx-auto min-h-screen px-4 py-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

          {/* MAIN CATEGORY (UI ONLY) */}
          <select
            className="input mb-3"
            value={parentCategory}
            onChange={(e) => {
              const value = e.target.value;
              setParentCategory(value);
              setValue("category", "");
            }}
          >
            <option value="">Select Category</option>
            {Object.keys(categoryMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* SUB CATEGORY (ONLY WHEN EXISTS) */}
          {parentCategory && categoryMap[parentCategory].length > 0 && (
            <select
              className="input mb-3"
              {...register("category", { required: true })}
            >
              <option value="">Select Sub Category</option>
              {categoryMap[parentCategory].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}

          {/* ERROR ONLY WHEN SUBCATEGORY EXISTS */}
          {parentCategory &&
            categoryMap[parentCategory].length > 0 &&
            errors.category && (
              <p className="text-red-500">Sub category is required</p>
            )}

          {/* PRODUCT NAME */}
          <input
            className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
            placeholder="Product Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500">Product name is required</p>
          )}

          {/* DESCRIPTION */}
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Product Description
              <span className="text-xs text-gray-500 ml-1">
                (Use '\n' for new paragraphs)
              </span>
            </label>
            <textarea
              id="message"
              placeholder="Product Description"
              rows={4}
              {...register("description", { required: true })}
              className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
            ></textarea>
          </div>

          {/* PRICING */}
          <div className="grid grid-cols-3 gap-4 mb-3">
            <input
              type="number"
              className="input"
              placeholder="Asking Price"
              {...register("askingPrice", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <input
              type="number"
              className="input"
              placeholder="Main Price"
              {...register("mainPrice", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <input
              type="number"
              className="input"
              placeholder="Discount (%)"
              {...register("discount", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>

          {(errors.askingPrice ||
            errors.mainPrice ||
            errors.discount) && (
            <p className="text-red-500">All price fields are required</p>
          )}

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="mb-6"
            onChange={(e) => setImages([...e.target.files])}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg"
          >
            Add Product
          </button>
        </form>
      </div>
    //  // <AdminRoute>
  );
}

export default AddProduct;
