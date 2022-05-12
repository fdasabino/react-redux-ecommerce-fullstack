import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  const history = useHistory();
  const { slug } = useParams();
  // console.log(slug);

  const handleModal = () => {
    if (user?.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
      toast.info("Please login to rate this product...");
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <AiOutlineStar className="text-info" size={20} /> <br />{" "}
        {user ? "Rate this product" : "Login to rate this product"}
      </div>
      <Modal
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.info(
            "Thanks for rating this product. Your feedback helps us to improve the quality of our products."
          );
        }}
        onCancel={() => setModalVisible(false)}
        title="Rate this product"
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
