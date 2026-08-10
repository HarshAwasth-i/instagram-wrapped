function Background({children}: any){

  return (

    <div
      className="
      min-h-screen
      bg-[#111315]
      relative
      overflow-hidden
      "
    >

  <div
className="
absolute
inset-0
bg-[radial-gradient(circle_at_top,#4b5563,transparent_35%)]
"
/>


      <div
        className="
        relative
        z-10
        "
      >

        {children}

      </div>


    </div>

  )

}


export default Background;