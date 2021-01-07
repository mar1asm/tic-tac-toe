import './Square.css';

function Square({pos, handleClick, content}) {
  return (
    <div className="Square" onClick={ ()=> handleClick(pos)}>
        <div>{content}</div>
    </div>
  );
}

export default Square;