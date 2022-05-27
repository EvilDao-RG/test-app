import './App.css';
import './Form.css'
import React from 'react';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={name:'',genre:'',studio:''};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
        fetch('/forms/putGame',{
            method:'PUT',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                "name":this.state.name,
                "genre":this.state.genre,
                "studio":this.state.studio
            })
        })
            .then(x => console.log('Hola'));
    }

    render(){
        return(
            <div>
                <form id='Form' onSubmit={this.handleSubmit}>
                    <div>
                        <label className='Form-label'>Name</label>
                        <input type="text" name='name' value={this.state.name} onChange={this.handleInputChange} placeholder='Name'/>
                    </div>
                        <br/>
                    <div>
                        <label className='Form-label'>Genre</label>
                        <input type="text" name='genre' value={this.state.genre} onChange={this.handleInputChange} placeholder='Genre'/>
                    </div>
                        <br/>
                    <div>
                        <label className='Form-label'>Studio</label>
                        <input type="text" name='studio' value={this.state.studio} onChange={this.handleInputChange} placeholder='Studio'/>
                    </div>
                    <br/>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}


export default Form;