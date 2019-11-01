import React from 'react';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.css';
import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap4.min.css';
import './App.scss';
import { ReactTabulator } from 'react-tabulator';

const options = {
  movableColumns: true,
  tooltips: true,
  resizableRows: true,
  selectable: true,
};

class App extends React.Component {

  tableData: any =
    [
      { id: 1, name: "Billy Bob", age: 12, gender: "male", height: 1, col: "red", dob: "", cheese: 1, driver: true },
      { id: 2, name: "Mary May", age: 1, gender: "female", height: 2, col: "blue", dob: "14/05/1982", cheese: true, driver: true },
      { id: 3, name: "Christine Lobowski", age: 42, height: 0, col: "green", dob: "22/05/1982", cheese: "true", driver: false },
      { id: 4, name: "Brendon Philips", age: 125, gender: "male", height: 1, col: "orange", dob: "01/08/1980", driver: true },
      { id: 5, name: "Margret Marmajuke", age: 16, gender: "female", height: 5, col: "yellow", dob: "31/01/1999", driver: false },
      { id: 6, name: "Billy Bob", age: 12, gender: "male", height: 1, col: "red", dob: "", cheese: 1, driver: true },
      { id: 7, name: "Mary May", age: 1, gender: "female", height: 2, col: "blue", dob: "14/05/1982", cheese: true, driver: true },
      { id: 8, name: "Christine Lobowski", age: 42, height: 0, col: "green", dob: "22/05/1982", cheese: "true", driver: false },
      { id: 9, name: "Brendon Philips", age: 125, gender: "male", height: 1, col: "orange", dob: "01/08/1980", driver: true },
      { id: 10, name: "Margret Marmajuke", age: 16, gender: "female", height: 5, col: "yellow", dob: "31/01/1999", driver: false },
    ]

  minMaxFilterEditor = function (cell: any, onRendered: any, success: any, cancel: any, editorParams: any) {

    var end: any;

    var container = document.createElement("span");

    //create and style inputs
    var start = document.createElement("input");
    start.setAttribute("type", "number");
    start.setAttribute("placeholder", "Min");
    start.setAttribute("min", "0");
    start.setAttribute("max", "100");
    start.style.padding = "4px";
    start.style.width = "50%";
    start.style.boxSizing = "border-box";

    start.value = cell.getValue();

    function buildValues() {
      success({
        start: start.value,
        end: end.value,
      });
    }

    function keypress(e: any) {
      if (e.keyCode == 13) {
        buildValues();
      }

      if (e.keyCode == 27) {
        cancel();
      }
    }

    end = start.cloneNode();
    end.setAttribute("placeholder", "Max");

    start.addEventListener("change", buildValues);
    start.addEventListener("blur", buildValues);
    start.addEventListener("keydown", keypress);

    end.addEventListener("change", buildValues);
    end.addEventListener("blur", buildValues);
    end.addEventListener("keydown", keypress);


    container.appendChild(start);
    container.appendChild(end);

    return container;
  }

  //custom max min filter function
  minMaxFilterFunction(headerValue: any, rowValue: any, rowData: any, filterParams: any) {
    //headerValue - the value of the header filter element
    //rowValue - the value of the column in this row
    //rowData - the data for the row being filtered
    //filterParams - params object passed to the headerFilterFuncParams property

    if (rowValue) {
      if (headerValue.start != "") {
        if (headerValue.end != "") {
          return rowValue >= headerValue.start && rowValue <= headerValue.end;
        } else {
          return rowValue >= headerValue.start;
        }
      } else {
        if (headerValue.end != "") {
          return rowValue <= headerValue.end;
        }
      }
    }

    return false; //must return a boolean, true if it passes the filter.
  }

  // table colums 
  tableColumn: any[] = [
    {
      title: 'Select All',
      field: 'checkbox',
      formatter: "rowSelection", titleFormatter: "rowSelection", align: "center", headerSort: false, cellClick: function (e: any, cell: any) {
        cell.getRow().toggleSelect();
      }
    },
    { title: "Name", field: "name", width: 150, align: "left", headerFilter: "input" },
    { title: "Age", field: "age", align: "left", sorter: "number", headerFilter: this.minMaxFilterEditor, headerFilterFunc: this.minMaxFilterFunction },
    { title: "Gender", field: "gender", align: "left", editor: "select", editorParams: { values: { "male": "Male", "female": "Female" } }, headerFilter: true, headerFilterParams: { values: { "male": "Male", "female": "Female", "": "" } } },
    { title: "Height", field: "height", headerFilter: "number", headerFilterPlaceholder: "at least...", headerFilterFunc: ">=" },
    { title: "Favourite Color", field: "col", align: "center", width: 200, editor: "input", headerFilter: "select", headerFilterParams: { values: true } },
    { title: "Date Of Birth", field: "dob", sorter: "date", align: "center", headerFilter: "input" },
    { title: "Cheese Preference", field: "cheese", align: "left", headerFilter: "input" },
    { title: "Driver", field: "car", align: "center", formatter: "tickCross", editor: true, sorter: "boolean", headerFilter: "tickCross", headerFilterParams: { "tristate": true }, headerFilterEmptyCheck: function (value: any) { return value === null } }
  ]


  render() {
    return (

      <ReactTabulator
        className="mytable"
        data={this.tableData}
        columns={this.tableColumn}
        layout={'fitData'}
        options={options}
      //responsiveLayout={"hide"} //hide columns that dont fit on the table
      //pagination={"local"}      //paginate the data
      //paginationSize={6}        //allow 7 rows per page of data  
      //selectable={true}
      //movableColumns={true}      //allow column order to be changed   
      //tooltips={true}            //show tool tips on cells
      //resizableRows={true}       //allow row order to be changed
      />
    );
  }
}

export default App;
