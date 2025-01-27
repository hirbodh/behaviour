import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation,useNavigate } from "react-router-dom";
import TabGenerator from "../../Components/TabGenerator";
import { useParams } from "react-router-dom";
import axios from "axios";
import Fields from "../../Components/Fields/Fields";
// import EditStyles from './EditStyles.scss'

const tabInfo = [
  { id: 1, title: "مهارت ها", path: "/BasicBehaviour" },
  { id: 2, title: "افزودن", path: "/BasicBehaviour/Create" },
  { id: 3, title: "ویرایش", path: "/BasicBehaviour/Edit" },
];
const apiUrl =
  "https://devcore.ronixtools.com/userinformation/api/BasicBehavioralSkill/GetBasicBehavioralSkillById";
const apiUrlUpdate =
  "https://devcore.ronixtools.com/userinformation/api/ClientApp/UpdateClientApp";

const formFields = [
  {
    title: "عنوان مهارت",
    type: "Text",
    name: "onvan",
    fieldId: "titleID",
    placeholder: "",
    dir: "rtl",
    txtAlign: "right",
    onclick: "",
    onChange: "",
  },
  {
    title: "تعداد کاربران",
    type: "Text",
    name: "tedad",
    fieldId: "countUser",
    placeholder: "",
    dir: "rtl",
    txtAlign: "right",
  },
  {
    title: "وضعیت",
    type: "checkbox",
    name: "vaziat",
    fieldId: "itemStatus",
    placeholder: "",
    dir: "rtl",
    txtAlign: "center",
  },
];


const setFieldValue = ({ fieldId, fieldValue }) => {
  const field = document.getElementById(fieldId);
  field.value = fieldValue;
};

export default function Edit() {
  // ---------------------------------- fetch Data
  const fetchData = async ({ pageId }) => {
    try {
      const response = await axios.post(apiUrl, {
        id: pageId,
      });
      setChangeValue(response.data.data);
      setChecked(response.data.data.isActive)
      } catch (error) {
        console.error(error);
      }
    };

  // ---------------------------------- Modify Data
  async function editData({ id, title, isActive }) {
    try {
      const response = await axios.put(apiUrl, {
        id: id,
        title: title,
        isActive: isActive,
      });
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // ---------------------------------- handle Active CheckBox
  const [checkValue, setCheckValue] = useState();
  const [currentPageID, setCurrentPageID] = useState();
  const [title, setTitle] = useState();
  const location = useLocation();
  const [checked, setChecked] = useState();
  const [changeValue, setChangeValue] = useState({
    id: 0,
    isActive: true,
    numberOfUser: 0,
    title: "",
  });

// ---------------------------------- Update Field Value
const updateValue = (e) => {
  const currID = e.target.id;
  if (currID === 'title') {
    setChangeValue({
      ...changeValue,
      title: e.target.value,
    });
  } else if (currID === 'numberOfUser') {
    setChangeValue({
      ...changeValue,
      numberOfUser: e.target.value,
    });
  } else if (currID === 'isActive') {
    setChangeValue({
      ...changeValue,
      isActive: !changeValue.isActive,
    });
  }
};
// ----------------------------------------------------------------------- Modify Item
const navigate = useNavigate();

const modifyItem = async () => {
  try {
    const response = await axios.put(`https://devcore.ronixtools.com/userinformation/api/BasicBehavioralSkill/UpdateBasicBehavioralSkill/`,{
      "id": currentPageID,
      "title": changeValue.title,
      "isActive": changeValue.isActive
    });
    console.log('record Modified: ', response.data)
    navigate('/BasicBehaviour')
  } catch (error) {
    console.error ('err modify record: ', error)
  }
}

// -------------------------------- PageID
  useEffect(() => {
    if (location.search) {
      const pageId = location.search.substring(4);
      setCurrentPageID(location.search.substring(4));
      fetchData({ pageId });
    } else {
      console.log("no search");
    }
  }, []);

  const params = useParams();
  const [activeTab, setActiveTab] = useState(3);

  return (
    <div className="child-wrapper">
      <div className="child-tab">
        <ul>
          {tabInfo.map((tab) => (
            <TabGenerator key={tab.id} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
          ))}
        </ul>
      </div>
      <div className="child-body">
        {/* ------------------------------------------------------------------------- Fields Start */}
        {/* <Fields formFields={formFields} checkValue={checkValue} /> */}
        <div className="row">
          <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <label htmlFor="inputPassword" className="col-form-label">
              {formFields[0].title}
            </label>
            <div>
              <input value={changeValue.title} onChange={updateValue} type={formFields[0].type} className="form-control" id='title' placeholder={formFields[0].placeholder} />
            </div>
          </div>
          <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <label htmlFor="inputPassword" className="col-form-label">
              {formFields[0].title}
            </label>
            <div>
              <input value={changeValue.numberOfUser} disabled onChange={updateValue} type={formFields[0].type} className="form-control" id='numberOfUser' placeholder={formFields[0].placeholder} />
            </div>
          </div>
          <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <label htmlFor="inputPassword" className="col-form-label">
              وضعیت
            </label>
            <div className="form-check form-switch">
              <input className="form-check-input" onChange={updateValue} type="checkbox" role="switch" id='isActive' checked={checked} onClick={() => setChecked(!checked)} />
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------------- Fields  */}

        <div className="d-flex align-items-center justify-content-center mt-3">
          <button onClick={modifyItem} className="btn btn-primary m-1">ذخیره</button>
          <Link to="/BasicBehaviour" className="btn btn-danger m-1">
            انصراف
          </Link>
        </div>
      </div>
    </div>
  );
}
