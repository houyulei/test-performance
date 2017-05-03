/**
 * Created by houyulei on 17/5/3.
 */
import React from 'react';
import {ajax} from './util';

let repeat = 1;
let items = [];

let time = +new Date();

function render(el) {
    let content = [];
    items.forEach((item, index) => {
        for (let i = 0; i < repeat; i++) {
            content.push(`<li class="list-view-item">${index + 1 + '-' + (i + 1)}. ${item.value}</li>`)
        }
    })

    el.innerHTML = content.join('');
    document.getElementById('time').innerHTML = (+new Date() - time)
}

export function setRepeat(el, r) {
    repeat = +r;
    render(el)
}

export function fetchData(el, type) {
    ajax({
        url: 'component.list.view'
    }).then(data => {
        const list = data.value.list;
        items = type === 'refresh' ? list : items.concat(list)
        render(el);
    });
}

export function refresh(el) {
    time = +new Date();
    fetchData(el, 'refresh');
}

export function append(el) {
    time = +new Date();
    fetchData(el, 'load');
}
