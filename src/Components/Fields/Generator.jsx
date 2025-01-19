import React,{useState, useEffect} from 'react'
import { DatePicker } from "zaman";

export default function Text({ formFields, checkValue }) {
  const [checked, setChecked] = useState(checkValue)
  useEffect(() => {
    setChecked(checkValue)
  }, [checkValue])
  
  return (
    <>
      {formFields.type === 'checkbox' 
      ?
      <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <label htmlFor="inputPassword" className="col-form-label">{formFields.title}</label>
            <div className='form-check form-switch'>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={formFields.fieldId}
                checked={checked}
                onClick={()=>setChecked(!checked)}
              />
            </div>
        </div>
      :
        <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <label htmlFor="inputPassword" className="col-form-label">{formFields.title}</label>
            <div>
              {formFields.type === 'DatePicker' ? <DatePicker round="x4" inputAttributes={{ placeholder: "start date" }} inputClass="form-control" position="center" /> : ''}
              {formFields.type !== 'DatePicker' ? <input type={formFields.type} className="form-control" id={formFields.fieldId} placeholder={formFields.placeholder} /> : ''}
            </div>
        </div>
      }
    </>
    

    // <>
    //     <div className="form-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
    //         <label htmlFor="inputPassword" className="col-form-label">{formFields.title}</label>
    //         <div>
    //             {formFields.type === 'DatePicker' ? <DatePicker round="x4" inputAttributes={{ placeholder: "start date" }} inputClass="form-control" position="center" /> : ''}
    //             {formFields.type !== 'DatePicker' ? <input type={formFields.type} className="form-control" id={formFields.fieldId} placeholder={formFields.placeholder} /> : ''}
    //         </div>
    //     </div>
    // </>
  )
}