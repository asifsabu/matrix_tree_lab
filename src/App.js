import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import data_file from './data/data_file';
import highlight from './data/highlight';

class App extends Component {


  clicked = () => {
    
  }


  checkCell = (dataitemrow,key)=>{
    var result = 'other'
    var formattedAnnotations = highlight.formattedAnnotations

    formattedAnnotations.forEach((fa)=>{
      var hlobject = fa.annotations.annotations[key]
      if(hlobject){
        if(hlobject.inclusion.includes(dataitemrow)){
          result = 'inclusive'
          return
        }
        else if(hlobject.exclusion.includes(dataitemrow)){
          result = 'exclusive'
          return
        }
      }

    })  
    

   return result
  }


  getCell = (dataitemrow,key)=>{

    switch (this.checkCell(dataitemrow,key)) {
      case 'inclusive':

          return <td className="bg-success">{dataitemrow}</td>
      case 'exclusive':
        
          return <td className="bg-danger">{dataitemrow}</td>
      case 'other':
        
          return <td>{dataitemrow}</td>
    
      default:
          return <td>{dataitemrow}</td>
    }

  }

  render() {

    var file = data_file.deIdentifiedFile.file

    var keys = Object.keys(file)

    
    return (
      <div>
        {
          keys.map((key)=>{
            if(file[key].text_extract)
            return(
              file[key].text_extract.tables.map((item,index)=>(
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {item.columns.map((column,columnindex) => (
                      <th>{column}</th>
                    ))
                      }
                    
                  </tr>
                </thead>
                <tbody>
                  {item.data.map((dataitem,dataitemindex) => (
                    <tr>{
                      dataitem.map((dataitemrow,dataitemrowindex) => (
                        
                          this.getCell(dataitemrow,key)

                      ))
                    }</tr>
                  ))}
                </tbody>
              </Table>
            ))
          )
          else return null
        }
          )
        
      }
    
    
    </div>
    );
  }
}

export default App;
