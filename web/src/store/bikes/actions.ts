import { IBike } from 'types';
import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM } from './constants';


export const addItem = ({ id, label = '' }: { id: string, label?: string }) => ({
    type: ADD_ITEM,
    payload: { item: { id, label, isSelected: false, isEditing: true } }
})

export const updateItem = (item: IBike) => ({
    type: UPDATE_ITEM,
    payload: { item }
})

export const deleteItem = (id: string) => ({
    type: REMOVE_ITEM,
    payload: { item: { _id: id } }
})
