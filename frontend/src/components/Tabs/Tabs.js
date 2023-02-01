import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Tabs.module.scss';

import { TabNavItem ,TabContent} from './TabComponent';
import FirstItem from './FirstItem';
import SecondItem from './SecondItem';

const cx = classNames.bind(styles);

const dataTabs = [
    {
        id: "tab1",
        title: "Exam",
        content: FirstItem,
    },
    {
        id: "tab2",
        title: "Result",
        content: SecondItem,
    },
    {
        id: "tab3",
        title: "Ultrasound result",
        // content: SecondItem,
    }
]

function Tabs() {

    const lineRef = useRef();

    const [infoTab, setInfoTab] = useState({
        activeTab: "tab1",
        offsetLeft: 0,
        offsetWidth: "120px",
    });

    useLayoutEffect(()=>{
        lineRef.current.style.left = infoTab.offsetLeft;
        lineRef.current.style.width = infoTab.offsetWidth;
    },[infoTab])

    return (
        <div className={cx('tabs')}>
            <ul className={cx('nav')}>
                {dataTabs.map((item) => {
                    return (
                        <div key={item.id}><TabNavItem title={item.title} id={item.id} activeTab={infoTab.activeTab} setInfoTab={setInfoTab}/></div>
                    )
                })}
                <div ref={lineRef} className={cx('line')}></div>
            </ul>
        
            <div className={cx('outlet')}>
                {dataTabs.map((item) => {
                    const Content = item.content ? item.content : Fragment;

                    return (
                        <div key={item.id}>
                            <TabContent id={item.id} activeTab={infoTab.activeTab}>
                                <Content/>
                            </TabContent>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Tabs;