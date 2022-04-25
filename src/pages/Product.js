import React, { useState, useEffect } from "react";
import { getProduct } from "../functions/product";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";

const Product = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    loadSingleProduct();
  }, []);

  const loadSingleProduct = () => {
    getProduct(slug).then((p) => {
      setProduct(p.data);
      let arr = [];
      p.data.subs.map((s) => arr.push(s._id));
      //   setArrayOfSubs((prev) => arr);
    });
  };

  return (
    <div className="contaner-fluid">
      <div className="row pt-4 mx-0">
        <SingleProduct product={product} />
      </div>
      <div className="row  mx-0">
        <div className="col text-center py-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
