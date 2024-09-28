import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

function Add() {
    const [data, setData] = useState({ BillDate: '', Income: '', Expense: '' });
    const navigate = useNavigate();
    const ApiUrl = "http://localhost:3001/Bill";

    const handleSubmit = () => {
        
        if (!data.BillDate || !data.Income || !data.Expense) {
            return;
        }

        fetch(ApiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(() => {
            navigate("/Bill"); 
        });
    };

    return (
        <>
            <div className='container'>
                <h1 className='text-center' style={{color:'skyblue'}}>Add Bill</h1>
                <div className='row'>
                    <div className='col'>Enter Date: </div>
                    <div className='col'>
                        <input 
                            onChange={(e) => setData({ ...data, BillDate: e.target.value })} 
                            type='date' 
                            className='form-control' 
                            value={data.BillDate} 
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>Enter Income: </div>
                    <div className='col'>
                        <input 
                            onChange={(e) => setData({ ...data, Income: e.target.value })} 
                            type='number' 
                            className='form-control' 
                            value={data.Income}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>Enter Expense: </div>
                    <div className='col'>
                        <input 
                            onChange={(e) => setData({ ...data, Expense: e.target.value })} 
                            type='number' 
                            className='form-control' 
                            value={data.Expense} 
                        />
                    </div>
                </div>
                <div className='text-center'>
                <button onClick={handleSubmit} className='btn btn-outline-primary' style={{height:'auto', width:'8%',fontSize:'3vh'}}>Submit</button>
                <Link to='/Bill' className='btn btn-outline-secondary' style={{height:'auto', width:'8%',fontSize:'3vh'}}>Back</Link>
                </div>
            </div>
        </>
    );
}

export default Add;
