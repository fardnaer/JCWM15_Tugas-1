import React from 'react'

class Footer extends React.Component{
    render(){
        return(
            <div>
            
            <h4>{this.props.main}</h4>
            <h4>{this.props.usia}</h4>
            </div> 
        )
    }
}

export default Footer