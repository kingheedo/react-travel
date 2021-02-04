import React, { useState } from 'react'
import { Input,  } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
    const [SearchTerm, setSearchTerm] = useState("")
    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.updateSearchTerm(event.currentTarget.value)
    }
    return (
        <div>
            <div style={{display:'flex', justifyContent: 'flex-end', margin: "1rem auto"}}>
                <Search
            onChange={searchHandler}
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="middle"
            style={{width: '300px'}}
            value={SearchTerm}
            />
            </div>
        </div>
    )
}

export default SearchFeature
