import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function ActivityChart({data}:any){


return(

<div className="
bg-white/20
backdrop-blur-xl
rounded-3xl
p-6
w-full
max-w-xl
">


<h2 className="
text-2xl
font-bold
mb-5
">

Monthly Activity

</h2>


<ResponsiveContainer
width="100%"
height={300}
>

<BarChart data={data}>


<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Bar
dataKey="activity"
/>


</BarChart>


</ResponsiveContainer>


</div>

)

}


export default ActivityChart;