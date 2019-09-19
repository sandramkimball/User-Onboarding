import React, {useState, useEffect} from 'react';
import axios from'axios';
import {withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserForm = ({errors, touched, values, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        if(status){
            setUsers([status])
        }
    }, [status])

    return(
        <div className='user-form'>
            <Form>

               Username: <Field type='text' name='username' placeholder='Username' />
               {touched.username && errors.username && (<p className='error'>{errors.username}</p>)}

               Email: <Field type='text' name='email' placeholder='Email'/>
               {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}

               Password: <Field type='password' name='userPassword' placeholder='Password'/>
               {touched.password && errors.password && (<p className='error'>{errors.password}</p>)}
               
               <label className='terms-checkbox'>
                <Field type='checkbox' name='terms' checked={values.terms}/>
                <span className='checkmark'>I Agree to the Terms and Conditions.</span>
               </label>

               <button>Submit</button>

            </Form>

            {users.map(user=> (
                <ul>
                    <li>Name: {user.username}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}

        </div>
    );
};


const FormikUserForm = withFormik({
    mapPropsToValues({username, email, password, terms}){
        return{
            username: username || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
        };
    },

    validateSchema: Yup.object().shape({
        username: Yup.string().required('*Please enter username'),
        email: Yup.string().required(),
        password: Yup.string().required(),
    }),

    handleSubmit(values, {setStatus}){
        axios.post('https://reqres.in/api/users', values).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err.res);
        })
    }
})(UserForm);

export default FormikUserForm;


// Name**
// Email**
// Password
// Terms of Service (checkbox)**
// A Submit button to send our form data to the server.*