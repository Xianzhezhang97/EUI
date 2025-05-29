/** @format */

const btns: React.FC = () => {
  return (
    <div className='center flex flex-col justify-center items-center '>
      <div className='flex gap-x-4'>
        {' '}
        <button
          className='btn-1th'
          onClick={() => {
            setCount(count + 1);
            setCount(count + 1);
            setCount(count + 1);
          }}
        >
          Increase
        </button>
        <button className='btn-1th'>Decrease</button>
        <button className='two-btn'>Reset</button>
      </div>
    </div>
  );
};

export default btns;
