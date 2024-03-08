import React from 'react';
import { Link } from 'react-router-dom';
import "./landing.style.css";



const Landing = () => {
  return (
    <div className="landing-body">
		<h2 className='text-effect'>SHALL WE PLAY A GAME?</h2>
			<div>
				<Link to='/games'>
					<button className='btn' type='submit'>
          START
					</button>
				</Link>
			</div>
		</div>
  );
};

export default Landing;