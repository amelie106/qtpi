import React from 'react';

function Formula(){
    
        return(
            <Text> {this.props.wierdArray.map((formula)=> {
                return <Formula formula={formula} key={formula.id}/>
            })}</Text>
        )
    


}

export default Formula;