import React, { useState } from 'react'
// import Image from 'next/image'
// import iPCss from '../../styles/ImagePreview.module.css'
// import sCss from '../../styles/Sell.module.css'
import './image.css'

const ImagePreview = () => {
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    function deleteHandler(image) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }
    const uploadFiles = () => {

    }

    return (
        <div className="container">
            <section className="ImagePreview">
                {/* <div className={iPCss.ImageInputContainer}> */}
                <label className="ImageLabel">
                    + Add Images
                    <br />
                    <input
                        type="file"
                        name="images"
                        onChange={onSelectFile}
                        multiple
                        accept="image/png , image/jpeg, image/webp, application/pdf"
                        className="ImagePreviewInput"
                    />
                </label>
                <br />

                <input className="ImagePreviewInput" type="file" multiple />
                {/* </div> */}

                {/* {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : ( */}
                {/* {selectedImages.length == 0 ? "" : <button
          className={iPCss.uploadbtn}
          onClick={() => {
            console.log(selectedImages);
          }}
        >
          UPLOAD {selectedImages.length} IMAGE
          {selectedImages.length === 1 ? "" : "S"}
        </button>} */}
                {/* // ))} */}

                {selectedImages.length === 0 ? "" : <div className="images">
                    {selectedImages &&
                        selectedImages.map((image, index) => {
                            return (
                                <div key={image} className="image">
                                    <img className="preview" src={image}

                                        height={200}
                                        width={300}
                                        alt="upload" />
                                    <div className="ImgDelete">

                                        <button className="ImageDelete" onClick={() => deleteHandler(image)}>
                                            x
                                        </button>
                                    </div>
                                    <p className="ImageP">{index + 1}</p>
                                </div>
                            );
                        })}
                </div>}
                {/* <div className="buttons">
                    <button className="cancelbtn">Cancel</button>
                    <button className="savebtn">Save as draft</button>
                    <button className="submitbtn">Submit</button>
                </div> */}
            </section>
        </div>
    );
}

export default ImagePreview
