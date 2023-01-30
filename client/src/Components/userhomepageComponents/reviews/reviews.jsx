import './reviews.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Person1 from '../../../images/person1.webp';
import Person2 from '../../../images/person2.jpeg';

function reviews() {
    return (
        <div>
            <div className="reviewContainer">
                <div className="heading">
                    <h1>Popular Reviews</h1>

                </div>
                <div className="reviewWrapper">
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
                </div>
            </div>
        </div>
    )
}

export default reviews
