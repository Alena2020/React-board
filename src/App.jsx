import React, {useState} from "react";
import './App.css';

const App = () => {

  const [boards, setBoards] = useState([
    {id: 1, title: "ToDo", items:[{id:1, title: "1"}, {id:2, title: "2"}]},
    {id: 2, title: "In progress", items:[{id:1, title: "1"}]},
    {id: 3, title: "Done", items:[{id:1, title: "1"}, {id:2, title: "2"},{id:3, title: "3"}]}
  ])

  return (
    <div className="app">
      {boards.map(board => 
        <div className="board">
          <h2 className="boerd__title">{board.title}</h2>
          {board.items.map(item => 
            <div className="item">{item.title}</div>          
          )}          
        </div>       
      )}
    </div>    
  );
};

export default App;