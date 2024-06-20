import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../../Api";

import DetailCard from "../../components/DetailCard";


function ProductDetail() {
  const { product_id } = useParams();


  const { isPending, error, data } = useQuery({
    queryKey: ["productData", product_id],
    queryFn: () => fetchProductDetail(product_id),
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

  const  detailData = data

  return (
    <div className="detail-container md:p-12 ">
     <DetailCard detailData= {detailData}/>
    </div>
  );
}

export default ProductDetail;
