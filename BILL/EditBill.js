import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function Edit() {
  const [data, setData] = useState({
    BillDate: "",
    Income: "",
    Expense: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const ApiUrl = `http://localhost:3001/Bill/${id}`;
    fetch(ApiUrl)
      .then((res) => res.json())
      .then((res) => {
        const formattedBillDate = new Date(res.BillDate).toISOString().split("T")[0];
        setData({
          ...res,
          BillDate: formattedBillDate,
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const ApiUrl = `http://localhost:3001/Bill/${id}`;
    fetch(ApiUrl, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then(() => {
      navigate("/Bill");
    });
  };

  return (
    <div className="container">
      <h1 className='text-center text-info'>Edit Bill</h1>
      <div className="row">
        <label>Date</label>
        <input
          onChange={handleChange}
          type="date"
          name="BillDate"
          className="form-control"
          value={data.BillDate}
        />
      </div>
      <div className="row">
        <label>Income</label>
        <input
          onChange={handleChange}
          type="number"
          name="Income"
          className="form-control"
          value={data.Income}
        />
      </div>
      <div className="row">
        <label>Expense</label>
        <input
          onChange={handleChange}
          type="number"
          name="Expense"
          className="form-control"
          value={data.Expense}
        />
      </div>
      <div className='text-center'>
        <button onClick={handleSave} className="btn btn-outline-primary" style={{height:'auto', width:'8%',fontSize:'3vh'}}>
          Save
        </button>
        <Link to="/Bill" className="btn btn-outline-secondary" style={{height:'auto', width:'8%',fontSize:'3vh'}}>
          Back
        </Link>
      </div>
    </div>
  );
}

export default Edit;
