import React, {Component} from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {
  //create addItem event handler that will get called when the form gets submitted
  constructor(props){
    super(props);
    this.state = {
      //task list array
      items: []
    };
    //see form
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e){
    //Create itemArray variable to store the current value of the "items" state object.
    var itemArray = this.state.items;

    //Check if input element has content inside it. IF so, add object that contains entered text and key value that is set to current time.
    if(this._inputElement.value !== "") {
      itemArray.unshift({
        text: this._inputElement.value,
        key: Date.now()
      });

      //set state's "items" property to the value of itemArray.
      this.setState({
        items: itemArray
      });

      //Clear the value of the input element to make room for the next todo list item.
      this._inputElement.value = "";
    }
    console.log(itemArray);

    //override the event's default behavior so when form is submitted the page won't reload and clear the list's content.
    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function(item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }


  render(){
    return(
      <div className="todoListMain">
        <div className="header">
          {/*see button type submit*/}
          <form onSubmit={this.addItem}>
            {/*"ref" allows input (DOM element) to be accessed
              A.K.A. Can now access input element from anywhere inside this component by accessing _inputElement.*/}
            <input ref={(a) => this._inputElement = a} placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        {/*Pass in TodoItems component which is in charge of rendering todo list items.*/}
        <TodoItems entries={this.state.items}
                    delete={this.deleteItem}/>
      </div>
    );
  }
}

export default TodoList;
