import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button } from 'react-bootstrap';

export const AddTask = ({ handleSubmit }) => {
    const formik = useFormik({
        initialValues: {
            taskTitle: "",
            taskDescription: "",
            taskDate: "",
            taskAssignedTo: "",
            taskPriority: "",
            taskDuration: ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            taskTitle: Yup.string()
                .min(3, "Task title must be at least 3 characters")
                .max(50, "Task title must be at most 50 characters")
                .required("Task title is required!"),
            taskDescription: Yup.string()
                .min(10, "Task Description must be at least 10 characters")
                .max(200, "Task Description must be at most 200 characters")
                .required("Task Description is required!"),
            taskDate: Yup.string()
                .required("Task date is required!"),
            taskAssignedTo: Yup.string()
                .min(3, "Task assigned to must be at least 3 characters")
                .max(50, "Task assigned to must be at most 50 characters")
                .required("Task assigned to is required!"),
            taskPriority: Yup.string()
                .required("Task priority to is required!"),
            taskDuration: Yup.string()
                .required("Task duration to is required!").nullable()
        }),
        onSubmit: (data) => {
            handleSubmit(data);
        }
    });
    return (
        <div className="todoSection">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Row>
                        <Col className="col-12">
                            <Form.Control
                                className="input"
                                placeholder="Enter task title"
                                name="taskTitle"
                                value={formik.values.taskTitle}
                                onChange={formik.handleChange}
                            />
                        </Col>
                        <Col className="col-12">
                            {formik.touched.taskTitle &&
                                formik.errors.taskTitle ? (
                                <Form.Text className="error">
                                    {formik.errors.taskTitle}
                                </Form.Text>
                            ) : null}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col className="col-12">
                            <Form.Control
                                className="textarea"
                                placeholder="Enter task description"
                                name="taskDescription"
                                as="textarea"
                                rows={6}
                                value={formik.values.taskDescription}
                                onChange={formik.handleChange}
                            />
                        </Col>
                        <Col className="col-12">
                            {formik.touched.taskDescription &&
                                formik.errors.taskDescription ? (
                                <Form.Text className="error">
                                    {formik.errors.taskDescription}
                                </Form.Text>
                            ) : null}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col className="col-12">
                            <Form.Control
                                className="input"
                                name="taskDate"
                                type="date"
                                value={formik.values.taskDate}
                                onChange={formik.handleChange}
                            />
                        </Col>
                        <Col className="col-12">
                            {formik.touched.taskDate &&
                                formik.errors.taskDate ? (
                                <Form.Text className="error">
                                    {formik.errors.taskDate}
                                </Form.Text>
                            ) : null}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col className="col-12">
                            <Form.Control
                                className="input"
                                placeholder="Enter task assigned to"
                                name="taskAssignedTo"
                                value={formik.values.taskAssignedTo}
                                onChange={formik.handleChange}
                                // disabled={editProfileLoader}
                            />
                        </Col>
                        <Col className="col-12">
                            {formik.touched.taskAssignedTo &&
                                formik.errors.taskAssignedTo ? (
                                <Form.Text className="error">
                                    {formik.errors.taskAssignedTo}
                                </Form.Text>
                            ) : null}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col className="col-12">
                            <Form.Select 
                                name="taskPriority"
                                className="select" 
                                aria-label="Choose task priority"
                                onChange={formik.handleChange}
                            >
                                <option>Task priority</option>
                                <option value="Low">Low</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </Form.Select>
                        </Col>
                        <Col className="col-12">
                            {formik.touched.taskPriority &&
                                formik.errors.taskPriority ? (
                                <Form.Text className="error">
                                    {formik.errors.taskPriority}
                                </Form.Text>
                            ) : null}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col className="col-12">
                            <Form.Control
                                type="dateTime"
                                className="input"
                                placeholder="Enter task duration(in minutes)"
                                name="taskDuration"
                                type="number"
                                onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
                                value={formik.values.taskDuration}
                                onChange={formik.handleChange}
                            />
                        </Col>
                        <Col className="col-12">
                            {formik.touched.taskDuration &&
                                formik.errors.taskDuration ? (
                                <Form.Text className="error">
                                    {formik.errors.taskDuration}
                                </Form.Text>
                            ) : null}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col className="col-12">
                            <Button 
                                variant="secondary secondaryButton"
                                type="submit"
                            >Add new task</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    )
};