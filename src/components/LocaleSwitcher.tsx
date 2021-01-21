import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import { switchLanguage } from '../redux/actions';
import { AppState } from '../redux/reducers';

const { Option } = Select;

const LocaleSwitcher: FC = () => {
    const dispatch = useDispatch();

    const { currentLanguage } = useSelector((state: AppState) => ({
        currentLanguage: state.language.currentLanguage
    }))

    const onSwitchLanguage = (value: string) => {
        console.log('switch language', value)
        dispatch(switchLanguage(value));
    }
    return (
        <Select
            size="small"
            id="languages-select"
            value={currentLanguage}
            onChange={onSwitchLanguage}
        >
            <Option value={'en'}>EN</Option>
            <Option value={'ar'}>عربى</Option>
        </Select>
    )
}

export default LocaleSwitcher;