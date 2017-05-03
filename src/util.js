/**
 * Created by houyulei on 17/5/3.
 */
import data from '../mock/component.list.view.json';

export const ajax = () => {
    return new Promise((resolve) => {
        resolve(data)
    })
}
