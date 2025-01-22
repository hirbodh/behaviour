import React,{useState} from "react";
import { Link } from "react-router-dom";
import Fields from "../../Components/Fields/Fields";
import TabGenerator from "../../Components/TabGenerator";

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

export default function Create() {
  const [activeTab, setActiveTab] = useState(2)

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
        <Fields formFields={formFields} />
        <div className='d-flex align-items-center justify-content-center mt-3'>
            <button className='btn btn-primary m-1'>ثبت</button>
            <Link to="/BasicBehaviour" className='btn btn-danger m-1'>انصراف</Link>
        </div>
      </div>
    </div>
  );
}
