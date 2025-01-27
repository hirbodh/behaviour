import React,{useState} from "react";
import { Link, navigate, useNavigate } from "react-router-dom";
import Fields from "../../Components/Fields/Fields";
import TabGenerator from "../../Components/TabGenerator";
import axios from "axios";

const tabInfo = [
  { id: 1, title: 'مهارت ها', path: '/BasicBehaviour' },
  { id: 2, title: 'افزودن', path: '/BasicBehaviour/Create' },
  { id: 3, title: 'ویرایش', path: '/BasicBehaviour/Edit' },
]

const formFields = [
  {
    title: "عنوان فیلد",
    type: "Text",
    name: "fieldName",
    fieldId: "titleID",
    placeholder: "عنوان",
    dir: "rtl",
    txtAlign: "right",
  },
  {
    title: "ایمیل",
    type: "email",
    name: "fieldName",
    fieldId: "emailID",
    placeholder: "ایمیل",
    dir: "rtl",
    txtAlign: "right",
  },
  {
    title: "از تاریخ",
    type: "date",
    name: "dateFieldName",
    fieldId: "fromID",
    placeholder: "پسورد",
    dir: "ltr",
    txtAlign: "center",
  },
  {
    title: "تا تاریخ",
    type: "date",
    name: "dateFieldName",
    fieldId: "toID",
    placeholder: "پسورد",
    dir: "ltr",
    txtAlign: "center",
  },
  {
    title: "تاریخ آغاز",
    type: "DatePicker",
    name: "dateFieldName",
    fieldId: "beginID",
    placeholder: "انتخاب تاریخ",
    dir: "rtl",
    txtAlign: "center",
  },
  {
    title: "رمز عبور",
    type: "password",
    name: "fieldName",
    fieldId: "passID",
    placeholder: "پسورد",
    dir: "rtl",
    txtAlign: "center",
  },
];
// ---------------------------------------------------------------- update server
export default function Create() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState();
  const [changeValue, setChangeValue] = useState({
    isActive: false,
    title: "",
  });
// console.log(changeValue)
  const [activeTab, setActiveTab] = useState(2)

  const createItem = async () => {
    try {
      const response = await axios.post('https://devcore.ronixtools.com/userinformation/api/BasicBehavioralSkill/CreateBasicBehavioralSkill', {
          "title": changeValue.title,
          "isActive": changeValue.isActive
        }
      )
      console.log(response);
      navigate('/BasicBehaviour')
    } catch (error) {
      console.error(error);
    }
  }
  
// ---------------------------------- Update Field Value
const updateValue = (e) => {
  const currID = e.target.id;
  if (currID === 'title') {
    setChangeValue({
      ...changeValue,
      title: e.target.value,
    });
  } else if (currID === 'isActive') {
    setChangeValue((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
  }
  // console.log(changeValue)
};

  return (
    <div className='child-wrapper'>
      <div className='child-tab'>
        <ul>
          {tabInfo.map(tab => (
            <TabGenerator key={tab.id} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
          ))}
        </ul>
      </div>
      <div className='child-body'>
      <div className="row">
          <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <label htmlFor="inputPassword" className="col-form-label">
              {formFields[0].title}
            </label>
            <div>
              <input value={changeValue.title} onChange={updateValue} type={formFields[0].type} className="form-control" id='title' />
            </div>
          </div>
          <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <label htmlFor="inputPassword" className="col-form-label">
              تعداد کارب
            </label>
            <div>
              <input value={changeValue.numberOfUser} disabled onChange={updateValue} type={formFields[0].type} className="form-control" id='numberOfUser' />
            </div>
          </div>
          <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <label htmlFor="inputPassword" className="col-form-label">
              وضعیت
            </label>
            <div className="form-check form-switch">
              <input className="form-check-input" value={changeValue.isActive} onClick={updateValue} type="checkbox" role="switch" id='isActive' />
            </div>
          </div>
        </div>

        {/* <Fields formFields={formFields} /> */}
        <div className='d-flex align-items-center justify-content-center mt-3'>
            <button onClick={createItem} className='btn btn-primary m-1'>ثبت</button>
            <Link to="/BasicBehaviour" className='btn btn-danger m-1'>انصراف</Link>
        </div>
      </div>
    </div>
  );
}
