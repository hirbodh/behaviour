import React from 'react'

export default function TableGenerator({tableInfo, TableHeaders}) {
  return (
    <div className='table-container'>
        <table className='table'>
            <thead>
            <tr>
                {tableInfo.tableInfo.map((item, index) => (
                <th key={index}>{item.title}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {tableInfo.tableInfo.map((item, index) => (
                <tr key={index}>
                {tableInfo.tableInfo.map((info, index) => (
                    <td key={index}>{item[info.fieldId]}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}
