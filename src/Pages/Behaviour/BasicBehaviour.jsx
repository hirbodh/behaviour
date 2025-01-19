import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import TabGenerator from '../../Components/TabGenerator'
import axios, { Axios } from "axios";
import { MdOutlineDeleteSweep } from "react-icons/md";

const apiUrl = "https://devcore.ronixtools.com/userinformation/api/BasicBehavioralSkill/GetAllBasicBehavioralSkill";  

export default function BasicBehaviour() {
  const [tableInfo, setTableInfo] = useState([])
  const [activeTab, setActiveTab] = useState(1)
  const [modifyItem, setModifyItem] = useState()
  const navigate = useNavigate();
  const tabInfo = [
    { id: 1, title: 'مهارت ها', path: '/BasicBehaviour' },
    { id: 2, title: 'افزودن', path: '/BasicBehaviour/Create' },
    { id: 3, title: 'ویرایش', path: '/BasicBehaviour/Edit' },
  ]
  const TableHeaders = ["ردیف", "عنوان مهارت", "تعداد کاربران", "وضعیت", "ویرایش"];

  // ---------------------------------- fetchData
  useEffect(() => {
  const fetchData = async () => { 
    try {
      const response = await axios.post(apiUrl, {
        "search": null,
        "pagination": {
          "page": 0,
          "pageSize": 0
        }
      });
      setTableInfo(response.data.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);


// ---------------------------------- Modify item

  const handleModify = (e) => {
    const targetId = e.target.id;
    navigate(`/BasicBehaviour/Edit/?id=${targetId}`);
  }

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
        <div>
          <table className='table table-striped test-table'>
            <thead>
              <tr className='text-center'>
                <th>ردیف</th>
                <th>عنوان مهارت</th>
                <th>تعداد کاربران</th>
                <th>وضعیت</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {tableInfo.map((tableRow, index) => (
                <tr key={tableRow.id}>
                  <td className='col-1'>{index + 1}</td>
                  <td>{tableRow.title}</td>
                  <td>{tableRow.numberOfUser}</td>
                  <td className='col-1'>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={tableRow.isActive}
                        readOnly
                      />
                    </div>
                  </td >
                  {/* ------------------------------------------------------------------------- Edit icon */}
                  <td className='col-1'>
                    <span id={tableRow.id} onClick={handleModify} className='container-edit-svg'>
                      <svg id={tableRow.id} className='edit-svg' width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </span>
                  </td>
                  {/* ------------------------------------------------------------------------- delete icon */}
                  <td className='col-1'><MdOutlineDeleteSweep className='delete-svg' /></td>
                </tr>
              ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}