function CategoryTabs({
activeTab,
setActiveTab
}:any){


const tabs=[
{
name:"Messages",
icon:"💬"
},
{
name:"Likes",
icon:"♡"
},
{
name:"Content",
icon:"▣"
},
{
name:"Connections",
icon:"👥"
},
{
name:"Personality",
icon:"🎭"
}
];


return(

<div className="
flex
gap-5
">

{
tabs.map((tab)=>(


<button

key={tab.name}

onClick={()=>
setActiveTab(tab.name)
}


className={`
px-6
py-3
rounded-xl
font-bold
transition


${activeTab===tab.name

?

"bg-lime-300 text-black"

:

"bg-white/10 text-white"

}

`}

>

{tab.icon} {tab.name}


</button>


))

}


</div>

)


}


export default CategoryTabs;