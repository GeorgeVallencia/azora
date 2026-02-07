import { Link } from "react-router-dom";

function CheckOutPage () {

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:4000/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1 },
        ]
      })
    }).then(res => {
      if(res.ok) return res.json()
    }).then(({ url }) => {
  window.location = url 
})
  };

  return(
    <div className="flex max-w-4xl mx-auto justify-center items-center">
      <form onSubmit={handleSubmit} className="items-center py-2 px-3">
        <Link to='' className="border border-gray-500 py-2 px-3">Become a Member</Link>
      </form>
    </div>
  );
}

export default CheckOutPage;