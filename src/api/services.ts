import {API} from '~/constants';
import {getUrl} from '~/utils/getUrl';
import {IItem} from "~/types";

export const login = async (formData) => {

    const params = {}

    formData.map((field) => {
        Object.assign(params, {[field.name]: field.value})
    })

    const url = getUrl(API.Login, params);

    const response = await fetch(url);
    const {token} = await response.json();

    localStorage.setItem('token', token);
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
    const url = getUrl(API.Items, {
        userId,
    });

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });

    const data = await response.json();

    return data.items;
};

export const updateItem = (item: IItem) => (
    fetch(getUrl(API.Items), {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
)
