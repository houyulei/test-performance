/**
 * Created by houyulei on 17/5/3.
 */
import React from 'react';
import {action, extendObservable, observable} from 'mobx';
import {observer} from 'mobx-react';
import {ajax} from './util'

class Store {
    @observable items = []

    @action set(items) {
        items.forEach((item, index) => {
            if (this.items.length > index) {
                extendObservable(this.items[index], item);
            } else {
                this.items.push(item)
            }

            // this.items[index] = item;
        })
        // this.items.slice(0, this.items.length);

        this.items.splice(items.length, this.items.length - items.length);
    }

    @action append(items) {
        items.forEach((item) => {
            this.items.push(item)
        })
    }
}

const store = new Store()

let time = +new Date();

@observer
export default class Example extends React.Component {

    state = {
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

            if (type === 'refresh') {
                store.set(list)
            } else {
                store.append(list)
            }
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
        store.items.forEach((item, index) => {
                for (let i = 0; i < this.state.repeat; i++) {
                    content.push(<Item key={`item${index+1+'-'+(i+1)}`} index={`item${index+1+'-'+(i+1)}`} item={item}/>)
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

const Item = observer(function ({index, item}) {
    return (
        <li className="list-view-item">{`${index}. ${item.value}`}
        </li>
    )
})
