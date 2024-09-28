import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
    return (
        <>
            <center>
            <h1 style={{color:'red'}}>Welcome to Billing System</h1>
            <Link to='/Bill' className='btn btn-outline-info' style={{width:'10%', height:'auto',fontSize:'30px'}}>Start</Link>
            <Outlet />
            </center>
        </>
    );
}

function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const connectionURL = "http://localhost:3001/Bill";
        fetch(connectionURL)
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    const handleDelete = (id) => {
        const connectionURL = `http://localhost:3001/Bill/${id}`;
        fetch(connectionURL, { method: 'DELETE' })
            .then(res => res.json());
        setData(data.filter(item => item._id !== id));
    };

    return (
        <>
            <h1 style={{textAlign:'center',color:'darkblue'}}>Bill Page</h1>
            <table className='table table-responsive table-hover table-dark'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Income</th>
                        <th>Expense</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item._id}>
                            <td>{item.BillDate}</td>
                            <td>{item.Income}</td>
                            <td>{item.Expense}</td>
                            <td>
                                <button onClick={() => handleDelete(item._id)} className='btn btn-outline-danger'>Delete</button>
                                <button onClick={() => navigate(`/Bill/${item._id}`)} className='btn btn-outline-warning'>Edit</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <th>Total:</th>
                        <td>{data.reduce((acc, curr) => acc + curr.Income, 0)}</td>
                        <td>{data.reduce((acc, curr) => acc + curr.Expense, 0)}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div className='text-center'>
            <Link to='/Bill/add' className='btn btn-outline-success' style={{height:'auto', width:'8%',fontSize:'3vh'}}>Add</Link>
            <Link to='/' className='btn btn-outline-danger' style={{height:'auto',width:'8%',fontSize:'3vh'}}>Exit</Link>
            </div>
        </>
    );
}

export { Home, Layout };
