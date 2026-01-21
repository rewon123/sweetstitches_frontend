"use client";
import Accessories from "@/components/Accessories/Accessories";
import BannerFirstPage from "@/components/BannerFirstPage/BannerFirstPage";
import Compromising from "@/components/Compromising/Compromising";
import CrossbodyBags from "@/components/CrossBodyBags/CrossBodyBags";
import Forside from "@/components/Forside/Forside";
import LandingInsta from "@/components/Instagram/LandingInsta";
import SecondBanner from "@/components/SecondBanner/SecondBanner";
import SelectedFavor from "@/components/SelectedFavor/SelectedFavor";
import SelectedSuede from "@/components/SelectedSuede/SelectedSuede";
import { useContext, useEffect, useState } from "react";


export default function Home() {

  // const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/allProducts")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
    }, []);

  

  return (
    <div className="min-h-screen container mx-auto -mt-24 md:-mt-26 z-0 mb-20">
    
        <>
          {/* <BannerFirstPage settings={settings} /> */}
          <div className="text-center" style={{ marginTop: "280px" }}>
            <p className="font-semibold font-sans text-2xl">
              Sweet Stitches stands for Elegance, Versatility, Reflection
              of Personality.
            </p>
            <p className="font-semibold font-sans text-2xl">
              To design Sweet Stitches products that would make women feel empowered
              and men feel confident in their life.
            </p>
          </div>
          {/* {best.length > 0 && <SelectedFavor best={best} settings={settings} />} */}
          {/* <Compromising /> */}
          {/* <SecondBanner /> */}
          {/* {promote1.length > 0 && (
            <SelectedSuede promote1={promote1} settings={settings} />
          )} */}
          {/* <CrossbodyBags /> */}
          {/* <Forside /> */}
          {/* {promote2.length > 0 && ( */}
            <Accessories  products={products} />
          {/* )} */}
          <LandingInsta />
        </>
      {/* )}/ */}
    </div>
  );
}
