import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Styled from "styled-components";
import './Form.css';

const Div = Styled.div`
background-color: gray;
height: 700px;
width: 500px;
margin-left: 250px;
border: 3px solid #34495e;
border-radius: 5%;
margin-top:30px;
`;

const Item = Styled.div`
    padding: 0.5em;	
    background-color: #A20000;
`;

const Button = Styled.button`
margin-top:20px;
height: 100px;
width: 100px;
border-radius: 50%;
background-color: #A20000;
color:white;
font-size: 1em;
`;

const H1 = Styled.h1`
color:white;
`;

const H4 = Styled.h4`
color:white;
`;

function OnboardingForm({values, errors, touched, status}) {
    const [ members, setMembers] = useState([]);

    useEffect(() => {
        if (status) {
            setMembers([...members, status]);
        }
    }, [status]);

    return (
        <Div>
            <H1>New User Form</H1>
            <Form>

            <Item>
                <Field type="text" name="name" placeholder="name" />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
            </Item>

            <Item>
                <Field type="Email" name="email" placeholder="email" />
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
            </Item>

            <Item>
                <Field type="password" name="password" placeholder="password" />
                {touched.password && errors.password && <p className="error">{errors.password}</p>}
            </Item>

            <Item>
                <Field component="select" className="selectRole" name="selectRole">
                    <option>Job Title</option>
                    <option value="Front End Dev">Front End Dev</option>
                    <option value="Back End Dev">Back End Dev</option>
                    <option value="Full Stack Dev">Full Stack Dev</option>
                </Field>
                {touched.food && errors.food && <p className="error">{errors.food}</p>}
            </Item>

            <Item>
                <H4>Terms of Service</H4>
                <Field  className="checkbox" type="checkbox" name="checkbox" checked={values.checkbox} />
            </Item>

            <Button type='submit'>Submit</Button>
            </Form>
            {members.map(member => (
                <ul key={member.id}>
                    <li>name: {member.name}</li>
                    <li>email: {member.email}</li>
                    <li>password: {member.password}</li>
                </ul>
            ))}
        </Div>
      );
    }

    const FormikOnboardingForm = withFormik({
        mapPropsToValues({name, email, password, selectRole, checkbox}) {
          return {
            name:name || '',
            email:email || '',
            password:password || '',
            selectRole: selectRole || '',
            checkbox:checkbox || ''
        };
      },

      validationSchema: Yup.object().shape({
        name: Yup.string().required("Name Required"),
        email: Yup.string().required("Email Required"),
        password: Yup.string().required("Password Required")
    
      }),


      handleSubmit(values, {setStatus}) {
        console.log(values)  

        axios.post(" https://reqres.in/api/members", values)
        .then(result => {
            console.log(result)
            setStatus(result.data);
        })
        .catch(error => console.log(error.result));
        
        }
      })(OnboardingForm);
      
      export default FormikOnboardingForm ;