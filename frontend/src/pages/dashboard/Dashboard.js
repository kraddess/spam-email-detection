import React, { useEffect, useState } from "react";
import {
  Grid
} from "@material-ui/core";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { sendEmail } from "../../apis/email";
import { BorderColor } from "@material-ui/icons";
// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import Table from "./components/Table/Table";
import { getEmailsAction, useEmailDispatch, useEmailState } from "../../context/EmailContext";

export default function Dashboard(props) {
  const dispatch = useEmailDispatch();
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    recipient: '',
    subject: '',
    text: ''
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const handleClose = () => {
    setShow(false);

  };

  const handleSubmit = (event) => {
    sendEmail(formState).then((res) => {
      getEmailsAction(dispatch);
      handleClose();
    });
    event.preventDefault();
  };

  const handleShow = () => setShow(true);
  var classes = useStyles();
  const { emails } = useEmailState();

  return emails ? (
    <>
      <div className="d-flex justify-content-between">
        <PageTitle title="Dashboard" />
        <div className="d-flex align-items-center">
          <button className="btn btn-primary" onClick={handleShow}><BorderColor/><span className="px-2">Compose</span></button>
          <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Compose Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group controlId="recipient" className="mb-1">
              <Form.Control type="email" name="recipient" placeholder="Recipient" onChange={handleFormChange} />
            </Form.Group>
            <Form.Group controlId="subject" className="mb-1">
              <Form.Control type="text" name="subject" placeholder="Subject" onChange={handleFormChange} />
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Control as="textarea" name="text" rows={10} onChange={handleFormChange}/>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Send
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title="All Emails"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={emails} history={props.history} />
          </Widget>
        </Grid>
      </Grid>
    </>
  ) : (<></>);
}
