import './reviews.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Person1 from '../../../images/person1.webp';
import Person2 from '../../../images/person2.jpeg';
import {motion} from "framer-motion"
import { useEffect, useRef } from 'react';
import { useState } from 'react';

function Reviews() {
    const [width,setWidth] = useState(0)

    const courosel = useRef();

    useEffect(()=>{
        console.log(courosel.current.scrollWidth,courosel.current.offsetWidth);
        setWidth(courosel.current.scrollWidth - courosel.current.offsetWidth)

    },[]);
    return (
        <div>
            <motion.div className="reviewContainer">
                <div className="heading">
                    <h1>Popular Reviews</h1>

                </div>
                <motion.div className="reviewWrapper" ref={courosel} style={{left:-width}} >
                    <motion.div className="reviewCard" >
                        <img src={Person1} alt="" />
                        <div className="reviewText">
                        
                            <p>There are many variations of passages
                            of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour,
                            or randomised words which don't look even slightly
                            believable.
                      </p>
                      <h6>User Name</h6>
                            <div className="reviewStar">
                            <span>
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                            </span>
                        </div>
                        </div>
                       
                    </motion.div>
                    <div className="reviewCard">
                        <img src={Person2} alt="" />
                        <div className="reviewText">
                            <p>There are many variations of passages
                            of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour,
                            or randomised words which don't look even slightly
                            believable.
                      </p>
                            <h6>User Name</h6>
                            <div className="reviewStar">
                            <span>
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                            </span>
                        </div>
                        </div>
                       
                    </div>
                    <div className="reviewCard">
                        <img src={Person1} alt="" />
                        <div className="reviewText">
                            <p>There are many variations of passages
                            of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour,
                            or randomised words which don't look even slightly
                            believable.
                      </p>
                            <h6>User Name</h6>
                            <div className="reviewStar">
                            <span>
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                            </span>
                        </div>
                        </div>
                       
                    </div>
                    <div className="reviewCard">
                        <img src={Person2} alt="" />
                        <div className="reviewText">
                            <p>There are many variations of passages
                            of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour,
                            or randomised words which don't look even slightly
                            believable.
                      </p>
                            <h6>User Name</h6>
                            <div className="reviewStar">
                            <span>
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                                <FontAwesomeIcon icon={faStar} className="faicon" />
                            </span>
                        </div>
                        </div>
                       
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Reviews
