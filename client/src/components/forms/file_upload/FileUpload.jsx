import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (event) => {
    console.log(event.target.files);
    //resize
    const files = event.target.files; // 3;
    const allUploadedFiles = values.images;

    //send back to server for uploading to cloudinary'
    //set url to images[] in the parent component > CreateProduct.jsx
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API_ENDPOINT}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemoveImage = (public_id) => {
    setLoading(true);
    console.log("Remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/removeimages`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        const filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log("Error removing images: ", err);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="row">
        <div className="col">
          {values.images?.map((image) => (
            <Badge
              style={{ cursor: "pointer" }}
              className="mx-2"
              key={image.public_id}
              count="X"
              onClick={() => handleRemoveImage(image.public_id)}
            >
              <Avatar
                className="mx-1"
                src={image.url}
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                shape="square"
              />
            </Badge>
          ))}
        </div>
      </div>
      <div className="row my-3">
        <div className="col">
          <input
            className="form-control"
            type="file"
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
