import React from "react";
// import ReactToPrint from "react-to-print";
import PlayersScoresMain from "./PlayersScoresMain";

class Raport extends React.Component {
  print = () => {
    var mywindow = window.open("", "PRINT", "height=1000,width=1900");

    // mywindow.document.write(
    //   "<html><head><title>" + document.title + "</title>"
    // );
    // mywindow.document.write("</head><body >");
    // mywindow.document.write("<h1>" + document.title + "</h1>");
    mywindow.document.write(document.getElementById("root").innerHTML);
    // mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  };

  render() {
    return (
      <PlayersScoresMain
        // ref={el => (this.componentRef = el)}
        add={this.props.add}
        raport
      />
    );
  }
}

export default Raport;
