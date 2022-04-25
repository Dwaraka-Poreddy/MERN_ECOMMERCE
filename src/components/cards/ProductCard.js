import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
const AdminProductCard = ({ product, handleRemove }) => {
  const { Meta } = Card;
  const { title, description, images, slug } = product;
  return (
    <Card
      // hoverable
      cover={
        <img
          alt={product.title}
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning " /> <br /> View Product
        </Link>,
        <>
          {" "}
          <ShoppingCartOutlined
            //   onClick={() => handleRemove(slug)}
            className="text-danger "
          />{" "}
          Add to Cart
        </>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 80)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
