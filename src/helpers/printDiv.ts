// method to print a div, or export it to pdf
// how it works : take a snapshot of a div inside a new window, and calls browser print function
// this way, the user is able to print/save as pdf, and able to change portrait/landscape with responsivness, as if we were coding a react page
export const printDiv = (divId: string, title = " ") => {
    let mywindow = window.open(" ", "PRINT", "height=650,width=900,top=100,left=150");
    if (!mywindow) return false;
  
    mywindow.document.write(`<html>`);
    mywindow.document.write(`<head>`);
    mywindow.document.write(`<title>${title}</title>`);
    mywindow.document.write(document.head.innerHTML); // load the css
    mywindow.document.write(`</head>`);
    mywindow.document.write(`<body style="-webkit-print-color-adjust:exact;print-color-adjust:exact">`); // prevent the printer to disable the background colors of divs
    mywindow.document.write(document.getElementById(divId)?.innerHTML!); // load the div
    mywindow.document.write(`</body>`);
    mywindow.document.write(`</body>`);
    mywindow.document.write(`</html>`);
  
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
  
    setTimeout(() => {
      mywindow?.print();
      mywindow?.close(); // close the new window as soon as the print has finished
    }, 300); // wait for eveything to load
  
    return true;
  };
  
  export default printDiv;
  