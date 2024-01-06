import Swal from "sweetalert2";
import React, { useState } from "react";
import { useStores } from "../../models";

const CreateTodo = (props) => {
  const { todosStore } = useStores();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreationOfTodo = () => {
    return Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const addList = (e) => {
    e.preventDefault();
    if (title === "" && description === "") {
      alert("Please enter something");
    } else {
      let data = {
        name: title,
        description: description,
      };
      todosStore.createTodo(data).then((res) => {
        if (res.ok) {
          handleCreationOfTodo();
        }
      });
    }
    setTitle("");
    setDescription("");
  };

  return (
    <div className="justify-content-center d-flex ">
      <form className="form-control w-50 h-75 shadow">
        <div className="my-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
          />
        </div>

        <div className="my-3">
          <label htmlFor="desc">Description</label>
          <textarea
            name="description"
            value={description}
            id="desc"
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="form-control"
          />
        </div>

        <div className="my-3">
          <label htmlFor="desc">Description</label>
          {/* <UploadImage /> */}
        </div>

        <div className="my-3">
          <button
            onClick={addList}
            className="btn btn-outline-primary text-dark"
          >
            Add your title
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
