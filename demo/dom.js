/**
 * Created by houyulei on 17/5/3.
 */
import {setRepeat, refresh, append} from '../src/dom'
import './basic.scss';

var content = document.getElementById('content');

document.getElementById('repeat').addEventListener('change', (e) => {
    setRepeat(content, e.currentTarget.value)
}, false)


document.getElementById('refresh').addEventListener('click', (e) => {
    refresh(content)
}, false)

document.getElementById('append').addEventListener('click', (e) => {
    append(content)
}, false)

refresh(content);
