/** @format */

const btns: React.FC = () => {
  return (
    <div className='center p-16 flex flex-col justify-center items-center '>
      <div className='flex-col gap-4 flex w-full mx-auto max-w-5xl'>
        <h1>H1 Heading</h1>
        <h2>H2 Heading</h2>
        <h3>H3 Heading</h3>
        <h4>H4 Heading</h4>
        <h5>H5 Heading</h5>
        <h6>H6 Heading</h6>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
          ducimus fugit veritatis nisi ab, corrupti dolor deleniti mollitia
          odit, vel fugiat ad nesciunt eum expedita ipsam alias reprehenderit
          architecto dicta. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Voluptates mollitia optio nemo consectetur? Sapiente suscipit
          unde sint accusamus optio beatae ab fuga accusantium ipsa? Natus
          excepturi tempora perspiciatis. Ad, soluta.
        </p>
        <a href='#' className='link'>
          a link
        </a>

        <button className='btn-1th'>btn-1th</button>
        <button className='two-btn'>two-btn</button>
        <button className='three-btn'>three-btn</button>
        <button className='four-btn'>four-btn</button>
      </div>
    </div>
  );
};

export default btns;
