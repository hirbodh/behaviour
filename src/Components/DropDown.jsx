import React from "react";
import axios from "axios";

export default function DropDown({ id }) {
    const handleClick = (event) => {
      if (event.target.value === "Edit") {
        console.log("edit ", id);
        fetchData();
      } else if (event.target.value === "Delete") {
        console.log("delete ", id);
      }
    };
    const apiUrl = "https://devcore.ronixtools.com/userinformation/api/BasicBehavioralSkill/GetBasicBehavioralSkillById";
    const fetchData = async () => {
        try {
            const response = await axios.post(apiUrl, {
            "id": id
            });
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
        }
    return (
      <>
        {/* <div class="dropdown">
            <a className="btn btn-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown link
            </a>

            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#"></a></li>
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
        </div> */}
        <div className="dropdown">
            <select className="btn dropdown-toggle" onChange={handleClick}>
                <option value=""></option>
                <option value="Edit">ویرایش</option>
                <option value="Delete">حذف</option>
            </select>
        </div>
      </>
    );
  }
  