import React, { useState } from 'react'

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

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
    }
  return (
    <form>
        <section>
        <label htmlFor="">Name</label>
        <input type="text" name='name' onChange={handleChange}/>
        </section>
        <section>
        <label htmlFor="">Age</label>
        <input type="number" name='age' onChange={handleChange}/>
        </section>
        <section>
        <label htmlFor="">Number</label>
        <input type="number" name='number' onChange={handleChange}/>
        </section>
        <section>
        <label htmlFor="">Email</label>
        <input type="email" name='email' onChange={handleChange}/>
        </section>
        <section>
        <label htmlFor="">Password</label>
        <input type="password" name='password' onChange={handleChange}/>
        </section>
        <section>
        <label htmlFor="">Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        </section>
        <section>
        <label htmlFor="" >Hobbies</label>
        <div>
            <label><input type="checkbox" name='Football' checked={formData.hobbies.includes('Football')}  onChange={handleCheckBoxChange}/>Football</label>
            <label><input type="checkbox" name='Reading'  checked={formData.hobbies.includes('Reading')}  onChange={handleCheckBoxChange}/>Reading</label>
            <label><input type="checkbox" name='Singing'  checked={formData.hobbies.includes('Singing')} onChange={handleCheckBoxChange}/>Singing</label>
            <label><input type="checkbox" name='Coading'  checked={formData.hobbies.includes('Coading')} onChange={handleCheckBoxChange}/>Coading</label>
        </div>
        </section>

        <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
  )
}
