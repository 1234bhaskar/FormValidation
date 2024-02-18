import React, { useState } from 'react'
import * as Yup from 'yup';
export default function Form() {
    const [formData,setFormData]=useState({
        name:'',
        age:'',
        number:'',
        email:'',
        password:'',
        gender:'',
        hobbies:[],


    })

    function handleChange(e){
     const {name,value}=e.target;
     setFormData({...formData,[name]:value})
    }

    function handleCheckBoxChange(e){
        const {name,checked}=e.target;
        let updatedHobbies =[...formData.hobbies];
        if(checked){
            updatedHobbies.push(name);
        }else{
            updatedHobbies=updatedHobbies.filter((hobbies)=>hobbies!==name)
        }

        setFormData({
            ...formData,
            hobbies:updatedHobbies,
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await validationSchema.validate(formData,{abortEarly:false})
            console.log("form Submitted",formData);
        }catch(error){
           // console.log(e);
            // console.log(error.inner);
            const newErrors={}
            error.inner.forEach(err=>{
                newErrors[err.path]=err.message

            })
            setError(newErrors);
        }
        //console.log(formData);
    }

    const [error,setError]=useState({});

    const validationSchema=Yup.object({
        name:Yup.string().required('Name is Required'),
        age:Yup.number().typeError("Age must be a number").required().positive().min(18,"minimum age is 18").max(60,"Max age is 60").integer(),
        number:Yup.string().matches(/^\d{10}$/,"Phone Number must be 10 digits").required(),
        email:Yup.string().email('Invalid Email').required("Eamil required"),
        password:Yup.string().required('Password is Required').min(8,"must be atleast 8 characters").matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
        ),
        gender:Yup.string().required("Gender is Required"),
        hobbies:Yup.array().required('select at least one Hobby'),
    })

    const nonParsed={
        age
: 
"18",
email
: 
"bhaskar2021chand@gmail.com",
gender
: 
"female",
hobbies
: ['Singing', 'Coading'],
name
: 
"bhaskar",
number
: 
"9354360121",
password
: 
"bhas@12345B",
    }

    const parsed= validationSchema.cast(nonParsed);
    console.log(nonParsed,parsed);
  return (
    <form className='form'>
        <div>
            <section>
        <label htmlFor="">Name</label>
        <input type="text" name='name' onChange={handleChange}/>
        {error.name && <div className="error">{error.name}</div>}
        </section>

        <section>
        <label htmlFor="">Age</label>
        <input type="number" name='age' onChange={handleChange}/>
         {error.age && <div className="error">{error.age}</div>}

        </section>
        <section>
        <label htmlFor="">Number</label>
        <input type="number" name='number' onChange={handleChange}/>
                {error.number && <div className="error">{error.number}</div>}

        </section>
        <section>
        <label htmlFor="">Email</label>
        <input type="email" name='email' onChange={handleChange}/>
                {error.email && <div className="error">{error.email}</div>}

        </section>
        <section>
        <label htmlFor="">Password</label>
        <input type="password" name='password' onChange={handleChange}/>
                {error.password && <div className="error">{error.password}</div>}

        </section>
        <section>
        <label htmlFor="">Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
                {error.gender && <div className="error">{error.gender}</div>}

        </section>
        <section>
        <label htmlFor="" >Hobbies</label>
        <div className='check'>
            <label><input type="checkbox" name='Football' checked={formData.hobbies.includes('Football')}  onChange={handleCheckBoxChange}/>Football</label>
            <label><input type="checkbox" name='Reading'  checked={formData.hobbies.includes('Reading')}  onChange={handleCheckBoxChange}/>Reading</label>
            <label><input type="checkbox" name='Singing'  checked={formData.hobbies.includes('Singing')} onChange={handleCheckBoxChange}/>Singing</label>
            <label><input type="checkbox" name='Coading'  checked={formData.hobbies.includes('Coading')} onChange={handleCheckBoxChange}/>Coading</label>
        </div>
                {error.hobbies && <div className="error">{error.hobbies}</div>}

        </section>

        <button type='submit' onClick={handleSubmit}>Submit</button>
   
        </div>
         </form>
  )
}
