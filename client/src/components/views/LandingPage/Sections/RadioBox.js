import { Collapse } from 'antd'
import React, { useState } from 'react'
import { Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {
    const [Value, setValue] = useState(0)


    const renderRadioBoxLists = () => (
        props.list && props.list.map((value, index) => (
            <Radio key={index} value={value._id}>{value.name}</Radio>
        ))
    )


    const changeHandler = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }


    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Price" key="1">
                    <Radio.Group onChange={changeHandler} value={Value}>
                        {renderRadioBoxLists()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
