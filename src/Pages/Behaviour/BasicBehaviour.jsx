import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TabGenerator from "../../Components/TabGenerator";
import axios from "axios";
import { MdOutlineDeleteSweep } from "react-icons/md";

const apiUrl = "https://devcore.ronixtools.com/userinformation/api/BasicBehavioralSkill/GetAllBasicBehavioralSkill";

export default function BasicBehaviour() {
  const [titleValue, setTitleValue] = useState();
  const [isActiveValue, setIsActiveValue] = useState();
  const [activeID, setActiveID] = useState()
  const [tableInfo, setTableInfo] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [modifyItem, setModifyItem] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [totalCount, setTotalCount] = useState();
  const [pageSize, setPageSize] = useState(10);

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow = (e) => {
    setActiveID(e)
    setShow(true);
  }

  // ----------------------------------------------------------------------- delete Permanantly
  const deletePermanantly = async () => {
    try {
      const response = await axios.delete(`https://devcore.ronixtools.com/userinformation/api/BasicBehavioralSkill/RemoveBasicBehavioralSkill/`,{
        data: {id: activeID}
      })
      console.log('record deleted: ', response.data)
      setActiveID('')
      setShow(false);
    } catch (error) {
      console.error ('err deleting record: ', error)
    }
  }
  // -----------------------------
  const navigate = useNavigate();
  const tabInfo = [
    { id: 1, title: "مهارت ها", path: "/BasicBehaviour" },
    { id: 2, title: "افزودن", path: "/BasicBehaviour/Create" },
    { id: 3, title: "ویرایش", path: "/BasicBehaviour/Edit" },
  ];
  const TableHeaders = [
    "ردیف",
    "عنوان مهارت",
    "تعداد کاربران",
    "وضعیت",
    "ویرایش",
  ];
  // ----------------------------------------------------------------------- fetchData
  useEffect(() => { 
    const handleKeyDown = (event) => { 
      if (event.key === 'Escape') { 
        handleClose()
      } 
    }; 
    window.addEventListener('keydown', handleKeyDown); 
    return () => { 
      window.removeEventListener('keydown', handleKeyDown); 
    }; 
  }, []);
  
  // ---------------------------------- fetchData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl, {
          search: null,
          pagination: {
            page: currentPage,
            pageSize: pageSize,
          },
        });
        setPrev(response.data.data.hasPreviousPage);
        setNext(response.data.data.hasNextPage);
        setTableInfo(response.data.data.items);
        setTotalCount(response.data.data.totalCount);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  // ---------------------------------- handleModuleClick
  const handleModuleClick = (e) => {
    if(e.target.id === "moduleContainer"){
      handleClose()
    }
  };
  // ---------------------------------- Modify item
  const handleModify = (e) => {
    const targetId = e.target.id;
    navigate(`/BasicBehaviour/Edit/?id=${targetId}`);
  };

  return (
    <>
      <div className="child-wrapper">
        <div className="child-tab">
          <ul>
            {tabInfo.map((tab) => (
              <TabGenerator
                key={tab.id}
                tab={tab}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </ul>
        </div>
        <div className="child-body">
          {/* -------------------------------------------------------- Filter */}
          <div className="fitler-container d-flex w-100 justify-content-between">
            <div className="d-flex justify-content-center align-items-center">
              <label htmlFor="جستجو">فیلتر</label>
              <input className="form-control" type="text" />
              <label htmlFor="جستجو">فیلتر</label>
              <input className="form-control" type="text" />
              <label htmlFor="جستجو">فیلتر</label>
              <input className="form-control" type="text" />
              <button className="btn btn-outline-dark p-1 ps-2 pe-2">
                جستجو
              </button>
            </div>

            <div className=" p-2 mb-2 d-flex justify-content-end">
              <button className="fitler-icon btn p-0">
                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > {" "} <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>{" "} <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" ></g>{" "} <g id="SVGRepo_iconCarrier"> {" "} <path d="M21 6H19M21 12H16M21 18H16M7 20V13.5612C7 13.3532 7 13.2492 6.97958 13.1497C6.96147 13.0615 6.93151 12.9761 6.89052 12.8958C6.84431 12.8054 6.77934 12.7242 6.64939 12.5617L3.35061 8.43826C3.22066 8.27583 3.15569 8.19461 3.10948 8.10417C3.06849 8.02393 3.03853 7.93852 3.02042 7.85026C3 7.75078 3 7.64677 3 7.43875V5.6C3 5.03995 3 4.75992 3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899C3.75992 4 4.03995 4 4.6 4H13.4C13.9601 4 14.2401 4 14.454 4.10899C14.6422 4.20487 14.7951 4.35785 14.891 4.54601C15 4.75992 15 5.03995 15 5.6V7.43875C15 7.64677 15 7.75078 14.9796 7.85026C14.9615 7.93852 14.9315 8.02393 14.8905 8.10417C14.8443 8.19461 14.7793 8.27583 14.6494 8.43826L11.3506 12.5617C11.2207 12.7242 11.1557 12.8054 11.1095 12.8958C11.0685 12.9761 11.0385 13.0615 11.0204 13.1497C11 13.2492 11 13.3532 11 13.5612V17L7 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ></path>{" "} </g>{" "} </svg>
              </button>
              <button className="btn p-0">
                <title>دانلود</title>
                <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > {" "} <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>{" "} <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" ></g>{" "} <g id="SVGRepo_iconCarrier"> {" "} <path fillRule="evenodd" clipRule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z" fill="#000000" ></path>{" "} <title>دانلود</title>{" "} </g>{" "} </svg>
              </button>
              <button className="fitler-icon btn p-0">
                <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > {" "} <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>{" "} <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" ></g>{" "} <g id="SVGRepo_iconCarrier"> {" "} <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ></path>{" "} </g>{" "} </svg>
              </button>
              <button
                onClick={() =>
                  (window.location.href = "/BasicBehaviour/Create")
                }
                className="btn p-0"
              >
                <title>ثبت آیتم جدید</title>
                <svg width="45px" height="45px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" > {" "} <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>{" "} <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" ></g>{" "} <g id="SVGRepo_iconCarrier"> {" "} <title>ثبت آیتم جدید</title>{" "} <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" > {" "} <g id="scheduler" fill="#000000" transform="translate(85.333333, 85.333333)" > {" "} <path d="M170.666667,1.42108547e-14 C264.923264,-3.10380131e-15 341.333333,76.4100694 341.333333,170.666667 C341.333333,264.923264 264.923264,341.333333 170.666667,341.333333 C76.4100694,341.333333 2.57539587e-14,264.923264 1.42108547e-14,170.666667 C2.6677507e-15,76.4100694 76.4100694,3.15255107e-14 170.666667,1.42108547e-14 Z M170.666667,42.6666667 C99.9742187,42.6666667 42.6666667,99.9742187 42.6666667,170.666667 C42.6666667,241.359115 99.9742187,298.666667 170.666667,298.666667 C241.359115,298.666667 298.666667,241.359115 298.666667,170.666667 C298.666667,99.9742187 241.359115,42.6666667 170.666667,42.6666667 Z M192,85.3333333 L191.999333,149.333333 L256,149.333333 L256,192 L191.999333,191.999333 L192,256 L149.333333,256 L149.333333,191.999333 L85.3333333,192 L85.3333333,149.333333 L149.333333,149.333333 L149.333333,85.3333333 L192,85.3333333 Z" id="Combined-Shape" ></path>{" "} </g>{" "} </g>{" "} </g>{" "} </svg>
              </button>
            </div>
          </div>
          {/* -------------------------------------------------------- End Filter */}
          <div>
            <table className="table table-striped test-table">
              <thead>
                <tr className="text-center">
                  <th>ردیف</th>
                  <th>عنوان مهارت</th>
                  <th>تعداد کاربران</th>
                  <th>وضعیت</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {tableInfo.map((tableRow, index) => (
                  <tr key={tableRow.id}>
                    <td className="col-1">{index + 1}</td>
                    <td>{tableRow.title}</td>
                    <td>{tableRow.numberOfUser}</td>
                    <td className="col-1">
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
                    </td>
                    {/* ------------------------------------------------------------------------- Edit icon */}
                    <td className="col-1">
                      <span
                        id={tableRow.id}
                        onClick={handleModify}
                        className="container-edit-svg"
                      >
                        <svg id={tableRow.id} className="edit-svg" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > {" "} <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>{" "} <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" ></g>{" "} <g id="SVGRepo_iconCarrier"> {" "} <path d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ></path>{" "} </g>{" "} </svg>
                      </span>
                    </td>
                    {/* ------------------------------------------------------------------------- delete icon */}
                    <td 
                      className="col-1"
                    >
                      <MdOutlineDeleteSweep
                        onClick={() => handleShow(tableRow.id)}
                        className="delete-svg"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalCount > pageSize ? (
            <div className="pagination">
              <button
                disabled={!next}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-light btn-sm"
              >
                {" "}
                &lt; بعدی
              </button>
              <button className="btn active btn-outline-dark btn-sm">
                {currentPage}
              </button>
              <button
                disabled={!prev}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-light btn-sm"
              >
                قبلی &gt;{" "}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {/* --------------------------- Modal */}
      {show && (
        <div id="moduleContainer" onClick={handleModuleClick} className="modal-wrapper blurred-overlay">
          <div className="modal-contents row p-4">
            <div className="d-flex justify-content-between">
                <h5>تایید حذف رکورد</h5>
            </div>
            <div className="mt-3 mb-3">
                  شما در حال حذف رکورد هستید<br />
                  با این کار تمامی رکوردهای مرتبط نیز حذف میشوند.<br />
                  آیا اطمینان دارد؟<br />
            </div>
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-secondary m-1" onClick={handleClose} > انصراف </button>
              <button onClick={deletePermanantly} type="button" className="btn btn-danger m-1"> حذف </button>
            </div>
          </div>
        </div>
      )}
      {/* --------------------------- End Modal */}
    </>
  );
}
