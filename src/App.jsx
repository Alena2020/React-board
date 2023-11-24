import React, {useState} from "react";
import './App.css';

const App = () => {

  const [boards, setBoards] = useState([
    {id: 1, title: "ToDo", items:[{id:1, title: "Task 1"}, {id:2, title: "Task 2"}, {id:3, title: "Task 3"}]},
    {id: 2, title: "In progress", items:[{id:4, title: "Task 4"}, {id:5, title: "Task 5"}, {id:6, title: "Task 6"}]},
    {id: 3, title: "Done", items:[{id:7, title: "Task 7"},{id:8, title: "Task 8"}, {id:9, title: "Task 9"}]}
  ])

  const [currentBoard, setCurrentBoard ] = useState(null)
  const [currentItem, setCurrentItem ] = useState(null)

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 10px 10px cyan';
    }
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    e.stopPropagation();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0 , currentItem);
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none';
  }

  function dropCardHandler(e, board) { 
    e.preventDefault();   
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    board.items.push(currentItem);    
  }

  return (
    <div className="app">
      {boards.map(board => 
        <div 
            className="board"
            onDragOver={(e) => dragOverHandler(e)}            
            onDrop={(e) => dropCardHandler(e, board)}     
        >
          <h2 className="boerd__title">{board.title}</h2>
          {board.items.map(item => 
            <div 
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}  
              onDragOver={(e) => dragOverHandler(e)}            
              onDrop={(e) => dropHandler(e, board, item)}                          
              draggable="true"        
              className="item">
              {item.title}
            </div>          
          )}          
        </div>       
      )}
    </div>    
  );
};

export default App;