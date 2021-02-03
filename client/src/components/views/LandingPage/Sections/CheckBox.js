import React,{useState} from 'react'
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;
function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const checkHandler = (value) => {
        const currentIndex = Checked.indexOf(value)

        const newChecked = [...Checked]
        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }
    const renderCheckBoxLists = () => props.list && props.list.map((item,index) => (
        <React.Fragment key= {index}>
          <Checkbox onChange ={() => checkHandler(item._id)} checked={Checked.indexOf(item._id) === -1 ? false : true}/>
              <span>
                  {item.name}
              </span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckBoxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
