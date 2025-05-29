/** @format */

const btns: React.FC = () => {
  return (
    <div className='center p-16 flex flex-col justify-center items-center max-w-5xl'>
      <div className='flex-col gap-4 flex w-full'>
        <h1>H1 Heading</h1>
        <h2>H2 Heading</h2>
        <h3>H3 Heading</h3>
        <h4>H4 Heading</h4>
        <h5>H5 Heading</h5>
        <h6>H6 Heading</h6>
        <p>p context</p>
        <a href='#' className='link'>
          a link
        </a>

        <button className='btn-1th'>btn-1th</button>
        <button className='two-btn'>two-btn</button>
        <button className='three-btn'>three-btn</button>
        <button className='four-btn'>four-btn</button>
        <button className='five-btn'>five-btn</button>
      </div>
    </div>
  );
};

export default btns;
