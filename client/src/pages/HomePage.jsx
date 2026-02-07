import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

function HomePage() {

  const data = [
    {name: 'Page A', uv: 400, pv: 2400, amt: 2400}, 
    {name: 'Page B', uv: 300, pv: 2400, amt: 2400}, 
    {name: 'Page C', uv: 300, pv: 2400, amt: 2400}, 
    {name: 'Page D', uv: 200, pv: 2400, amt: 2400}, 
    {name: 'Page E', uv: 270, pv: 2400, amt: 2400}, 
    {name: 'Page F', uv: 170, pv: 2400, amt: 2400}
  ];

  return(
    <div className='flex justify-center items-center mx-auto max-w-4xl my-10'>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
    </div>
  );
}

export default HomePage;