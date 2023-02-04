import React from 'react'

function Menu() {
  return (
    <div> 
                    <section id="menuContainer">

                        <div id="sectionHeading">
                            <h1>The Full Palette</h1>
                            <i class="fa-regular fa-heart"></i>
                        </div>


                        <h2>ENTREES</h2>
                        <div className="underline"></div>

                        <section className="menuList">
                            <button className="check"> <i className="fa-solid fa-check"></i></button>
                            <div className="listContent">
                                <h3>Escargot</h3>
                                <p>25€ </p>
                                <h4>With southern French spices</h4>
                            </div>
                        </section>
                    </section>
        </div>
  )
}

export default Menu
