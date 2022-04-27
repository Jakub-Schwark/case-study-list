import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlus, faCircleMinus, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import './List.css';
library.add(faCircleMinus, faCirclePlus, faSquareMinus, faSquarePlus);

function List({ data = [] }) {
    return (
        <div className="d-list">
            <ul className="d-list-container">
                {data.map((list) => (
                    <ListNode node={list} key={list.key}/>
                ))}
            </ul>
        </div>
    );
};

const ListNode = ({ node }) => {
    const [childVisible, setChildVisibility] = useState(false);
    const isRadio = node.type === "radio" ? true : false;
    const [icon, setIcon] = useState(isRadio ? "circle-plus" : "square-plus");
    const hasChild = node.children ? true : false;
    
    const clickHandle = () => {
        setChildVisibility((v) => !v);
        childVisible ? setIcon("square-plus") : setIcon("square-minus");

        if (isRadio) {
            childVisible ? setIcon("circle-plus") : setIcon("circle-minus");
        }
    }

    return (
        <li className="d-list-node">
            <div onClick={clickHandle} >
                { hasChild && (
                    <div className="d-inline" >
                     <FontAwesomeIcon icon={icon} />
                    </div>
                )}
                    <div className="d-list-head">
                        {node.label}
                    </div>    
            </div>
            {hasChild && childVisible && (
                <div className="d-list-content">
                    <ul className="d-list-container">
                        <List data={node.children} />
                    </ul>
                </div>
            )}
        </li>
    )
}

export default List;