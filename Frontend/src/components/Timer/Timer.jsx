import { Component } from 'react';

export default class Timer extends Component {
    render() {

        let {timer1 , timer2} = this.props;
        //the above line is like 
        //let timer1 = this.props.timer1;
        //let timer2 = this.props.timer2;
        return (
            <p>my timer: {timer1} - {timer2} </p>
        )
    }
}