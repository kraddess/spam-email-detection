import React from "react";
import { setEmailAction, useEmailDispatch } from "../../../../context/EmailContext";
const attributes = ['From', 'To', 'Subject', 'Date', 'Status']

export default function TableComponent({ history, data }) {
  const dispatch = useEmailDispatch();
  console.log(data)
  const onClickRow = (data) => {
    setEmailAction(dispatch, data)
    history.push(`/app/detail/${data._id}`)
  }
    return (
      <div className="container">
        <div>
          <div className="row border-bottom py-3">
            <div className="col-2 font-weight-bold">From</div>
            <div className="col-2 font-weight-bold">To</div>
            <div className="col-4 font-weight-bold">Subject</div>
            {/* <div className="col font-weight-bold">Text</div> */}
            <div className="col-3 font-weight-bold">Date</div>
            <div className="col-1 font-weight-bold">Status</div>
          </div>
        </div>
        {data.map((d) => (
          <div className="row border-bottom py-3" key={d._id} onClick={() => onClickRow(d)}>
            <div className="col-2 text-truncate">{d.from.email}</div>
            <div className="col-2">{d.to.email}</div>
            <div className="col-4">{d.subject}</div>
            {/* <div className="col">{text}</div> */}
            <div className="col-3">{d.date}</div>
            <div className="col-1">
              <div className={d.isSpam? 'badge text-bg-danger p-2' : 'badge text-bg-success p-2'}>{d.isSpam ? 'Spam' : 'Safe'}</div>
            </div>
          </div>
        ))}
      </div>
  );
}
