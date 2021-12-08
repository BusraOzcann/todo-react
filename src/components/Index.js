import { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function Index() {
  const [taskList, setTaskList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const onClickTask = (e, index) => {
    const items = [...taskList];
    items[index].name = e;
    setTaskList(items);
  };

  function addList(e) {
    if (e.key === "Enter") {
      setTaskList([...taskList, { name: e.target.value, isFinished: false }]);
      e.target.value = "";
    }
  }

  const onClickRemoveButton = (index) => {
    const filteredArray = taskList.filter((item) => item !== taskList[index]);
    setTaskList(filteredArray);
  };

  const checkBoxController = (index) => {
    var list = [...taskList];
    list[index].isFinished = !list[index].isFinished;
    setTaskList(list);
    console.log(taskList[index].isFinished);
  };

  const checkAllTasks = () => {
    var list = [...taskList];

    list.map((task, index) => {
      list[index] = { name: task.name, isFinished: !task.isFinished };
      setTaskList(list);
      setCheckAll(!checkAll);
    });
  };

  return (
    <>
      {/* Container Start */}
      <div className="container">
        {/* Header row start */}
        <div className="row bg-ligth d-flex justify-content-center">
          <div className="col-3 ">
            <h1 id="header">todos</h1>
          </div>
        </div>
        {/* Header row end */}

        {/* input field row start*/}
        <div className="row bg-ligth d-flex justify-content-center">
          <ul className="list-style input-fields-border col-6  m-0 p-0 list-bg">
            <li>
              <input
                type="checkbox"
                value={checkAll}
                onChange={(e) => {
                  checkAllTasks();
                }}
                className="col-1 checkbox-outline"
              />
              <input
                type="text"
                placeholder="What needs to be done?"
                onKeyDown={(e) => addList(e)}
                className="col-10 input-fields"
              />
            </li>
          </ul>
        </div>
        {/* input field bitiş*/}

        {/* List start */}
        <div className="row bg-ligth d-flex justify-content-center ">
          <ul className="col-6 list-style input-fields-border m-0 p-0 list-bg">
            {taskList.map((task, index) => (
              <li key={index} className="d-flex justify-content-center my-2">
                <input
                  type="checkbox"
                  className="col-1  checkbox-outline"
                  checked={task.isFinished}
                  onChange={(e) => checkBoxController(index)}
                />
                <input
                  style={
                    !task.isFinished
                      ? { textDecoration: "none" }
                      : { textDecoration: "line-through", color: "#D2D2D2" }
                  }
                  type="text"
                  value={task.name}
                  onChange={(e) => onClickTask(e.target.value, index)}
                  className="col-9 input-fields"
                />
                <button
                  onClick={() => onClickRemoveButton(index)}
                  className="col-1 buttons"
                >
                  X
                </button>
                <hr />
              </li>
            ))}
          </ul>
        </div>
        {/* List end */}
      </div>
      {/* Container end */}
    </>
  );
}

export default Index;
