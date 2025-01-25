import React,{useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import TabGenerator from "../../Components/TabGenerator";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Fields from '../../Components/Fields/Fields';
// import EditStyles from './EditStyles.scss'

const tabInfo = [
  { id: 1, title: 'مهارت ها', path: '/BasicBehaviour' },
  { id: 2, title: 'افزودن', path: '/BasicBehaviour/Create' },
  { id: 3, title: 'ویرایش', path: '/BasicBehaviour/Edit' },
]
const apiUrl = "https://devcore.ronixtools.com/userinformation/api/BasicBehavioralSkill/GetBasicBehavioralSkillById";
const apiUrlUpdate = "https://devcore.ronixtools.com/userinformation/api/ClientApp/UpdateClientApp";

const formFields = [
  {
    title: "عنوان مهارت",
    type: "Text",
    name: "onvan",
    fieldId: "titleID",
    placeholder: "",
    dir: "rtl",
    txtAlign: "right",
    onclick: "" ,
    onChange: "" 
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
  }
];

// ---------------------------------- Update Field Value
const setFieldValue = ({fieldId, fieldValue}) => {
  const field = document.getElementById(fieldId)
  field.value = fieldValue
}

export default function Edit() {

// ---------------------------------- fetch Data
const fetchData = async ({pageId}) => { 
  try {
    const response = await axios.post(apiUrl, {
      "id": pageId
    }); 
    // console.log(response.data.data);
    setFieldValue({fieldId: 'titleID', fieldValue: response.data.data.title})
    setTitle({fieldId: 'titleID', fieldValue: response.data.data.title})
    setFieldValue({fieldId: 'countUser', fieldValue: response.data.data.numberOfUser})
    setCheckValue(response.data.data.isActive)
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
      isActive: isActive
    }); 
    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

  // ---------------------------------- handle Active CheckBox
  const [checkValue, setCheckValue] = useState()
  const [currentPageID, setCurrentPageID] = useState()
  const [title, setTitle] = useState()
  const location = useLocation()

  useEffect(()=>{
    if(location.search){
      const pageId = location.search.substring(4)
      setCurrentPageID(location.search.substring(4))
      fetchData({pageId})
    }else{
      console.log('no search')
    }
  },[])

  const params = useParams()
  const [activeTab, setActiveTab] = useState(3)

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
        {/* ------------------------------------------------------------------------- Fields Start */}
        <Fields formFields={formFields} checkValue={checkValue} />
        {/* ------------------------------------------------------------------------- Fields  */}

        <div className='d-flex align-items-center justify-content-center mt-3'>
          <button className='btn btn-primary m-1'>ذخیره</button>
          <Link to="/BasicBehaviour" className='btn btn-danger m-1'>انصراف</Link>
        </div>
      </div>
    </div>
  );
}