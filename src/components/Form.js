import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field, ErrorMessage } from 'formik';
import * Yup from 'yup';

const UserForm = ({values}) => {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        if(status){
            setUsesr([...users, status])
        }
    }, [status])

    return(
        <div className='user-form'>
            <Form>

               Username: <Field type='text' name='username' placeholder='Username' />
               {touched.username && error.username && (<p className='error'>{error.username}</p>)}

               Email: <Field type='text' name='email' placeholder='Email'/>
               {touched.email && error.email && (<p className='error'>{error.email}</p>)}

               Password: <Field type='password' name='userPassword' placeholder='Password'/>
               {touched.password && error.password && (<p className='error'>{error.password}</p>)}
               
               <label className='terms-checkbox'>
                Terms: <Field type='checkbox' name='terms' checked={values.terms}/>
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
        username: Yup.strong().requited();
        email: Yup.strong().requited();
        password: Yup.strong().requited();
    }),

    handleSubmit(values, {setStatus}){
        axios.post('https://reqres.in/api/users', valies).then(res=>{
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