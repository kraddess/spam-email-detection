import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Letter } from 'react-letter';
import { setEmailAction, useEmailDispatch, useEmailState } from "../../context/EmailContext";

export function Detail () {
  const dispatch = useEmailDispatch();
  const { id } = useParams();
  const { current, emails } = useEmailState();
  useEffect(() => {
    if (!current && emails) {
      const email = emails.find(e => e._id === id);
      if (email) {
        setEmailAction(dispatch, email);
      }
    }
  }, [id, emails])
  return current ? (
    <div>
      <div className="d-flex align-items-center gap-3">
        {current.subject ? (<span className="font-weight-bold h2">{current.subject}</span>) : (<span className="font-weight-bold h2">No Subject</span>)}
        <div className={current.isSpam?"badge text-bg-danger p-2 ml-3":"badge text-bg-success p-2 ml-3"}>
          {current.isSpam ? 'Spam' : 'Safe'}
        </div>
      </div>
      <div>
        <span style={{fontWeight: 'bold'}}>From: </span>
        {current.from.name} &lt;{current.from.email}&gt;
      </div>
      <div className="mb-4">
        <span style={{fontWeight: 'bold'}}>To: </span>
        {current.to.name} &lt;{current.to.email}&gt;
      </div>
      <Letter html={current.html} text={current.text}/>
    </div>
  ) : (<div></div>)
}
