/**
 * Created by houyulei on 17/5/3.
 */
import React from 'react';
import {ajax} from './util'

let time = +new Date();
export default class Example extends React.Component {

    state = {
        data: [],
        repeat: 1
    }

    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.refresh = this.refresh.bind(this);
        this.append = this.append.bind(this);
        this.updateRepeat = this.updateRepeat.bind(this);
    }

    componentDidMount() {
        this.fetchData('refresh');
    }

    updateRepeat(e) {
        this.setState({
            repeat: e.target.value
        })
    }

    fetchData(type) {
        ajax({
            url: 'component.list.view'
        }).then(data => {
            const list = data.value.list;

            this.setState({
                data: type === 'refresh' ? list : this.state.data.concat(list)
            });
        });
    }

    refresh() {
        time = +new Date();
        this.fetchData('refresh');
    }

    append() {
        time = +new Date();
        this.fetchData('load');
    }

    componentDidUpdate() {
        document.getElementById('time').innerHTML = (+new Date() - time)
    }

    render() {
        const content = [];
        this.state.data.forEach((item, index) => {
                for (let i = 0; i < this.state.repeat; i++) {
                    content.push((
                        <li key={`item${index+1+'-'+(i+1)}`}
                            className="list-view-item">{`${index + 1 + '-' + (i + 1)}. ${item.value}`}
                        </li>
                    ))
                }

            }
        )
        return (
            <div>
                <div className="control">
                    <label>repeat:</label>
                    <input className="input" type="text" value={this.state.repeat} onChange={this.updateRepeat}/>
                    <a className="button" onClick={this.refresh}>refresh</a>
                    <a className="button" onClick={this.append}>append</a>
                </div>
                <div className="control">
                    time: <span id="time"></span>
                </div>
                <ul>{content}</ul>
            </div>
        )
    }
}
