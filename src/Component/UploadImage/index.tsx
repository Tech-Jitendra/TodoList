import React, { useEffect, useState } from "react";
import "./UploadImage.css";
import { v4 } from "uuid";

export const UploadImage = (props: { fileType: Array<any> }) => {
  // Get a props.fileName suffix starting from last '_' and replacing all '-' with ' '
  // Ex: '_<guid>_cover-picture' will be treated as 'cover picture'j

  // const download = require("images-downloader").images
  // const dest = "./assets/images"
  // const images = ["https://commons.wikimedia.org/static/images/project-logos/commonswiki.png"]
  // let result = await download(images, dest)

  let AcceptedFileTypes = props.fileType;
  const fileTypeStrings = AcceptedFileTypes.map((type) => `${type}/*`);
  const AcceptedFiles = fileTypeStrings.join(",");
  let name = "------";
  //  props.fileName
  //   .substr(props.fileName.lastIndexOf("_") + 1)
  //   .replace(/\W+/g, " ");

  const [fileData, setfileData] = useState(undefined);
  const [image, setImage] = useState<any>();
  const [imageExtension, setImageExtension] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const setPreviewImage = (imageData) => {
    var fileName = URL.createObjectURL(imageData);
    setImage(fileName);
  };

  const imageFileResponse = "";
  // useSelector((state) => {
  //   return state.uploadImageFileReducer;
  // });

  useEffect(() => {
    if (imageFileResponse) {
      // props.callback(imageExtension);
    }
  }, [imageFileResponse]);

  const dragNdrop = (event) => {
    const fi = document.getElementById("uploadFile");
    console.log("drag and drop -------- ", fi);
    // Check if any file is selected.
    // if (fi.files.length > 0) {
    //   for (const i = 0; i <= fi.files.length - 1; i++) {
    //     const fsize = fi.files.item(i).size;
    //     const file = Math.round(fsize / 1024);
    //     // The size of the file.
    //     if (file >= 10096) {
    //       alert("File too Big, please select a file less than 10mb");
    //     } else {
    //       event.preventDefault()

    //       console.log("event", event.target.files[0]);
    //       setPreviewImage(event.target.files[0]);
    //       setfileData(event.target.files[0]);
    //       let imageName = props.imagePath + v4() + props.fileName;
    //       const type = event.target.files[0].type.split("/");
    //       setImageExtension(imageName + "." + type[1]);
    //       if (
    //         !type[0] ||
    //         (type[0] !== AcceptedFileTypes.indexOf(type[0])) === -1
    //       ) {
    //         console.error("You can only upload image files.");
    //         return;
    //       }
    //       // dispatch(uploadImage({ documentName: imageName, format: type[1] }));

    //       const file = event.target.files[0];
    //       setSelectedFile(file);
    //     }
    //   }
    // }
  };
  const drag = () => {
    // document.getElementById('uploadFile').parentNode.className = 'draging
    // dragBox';
  };
  const drop = () => {
    // document.getElementById('uploadFile').parentNode.className = 'dragBox';
  };

  return (
    <div className=" mt-2">
      <div className="uploadOuter">
        <label htmlFor="uploadFile" className="btn btn-costum text-light">
          Upload {name}
        </label>

        <div className="my-2">
          {" "}
          <strong>OR</strong>
        </div>
        <span className="dragBox">
          Drag and Drop here
          <input
            type="file"
            accept={AcceptedFiles}
            onChange={dragNdrop}
            // onDragOver={drag()}
            // onDrop={drop()}
            id="uploadFile"
          />
        </span>
      </div>
      <div className="h-25 w-25" id="preview">
        {selectedFile && (
          <div>
            {selectedFile.type.includes("image") ? (
              <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
            ) : (
              <video
                style={{ width: "100%", height: "100%" }}
                src={URL.createObjectURL(selectedFile)}
                controls
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
