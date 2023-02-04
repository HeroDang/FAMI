// import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
/* A library that allows you to validate the props you pass to your React components. */
import PropTypes from 'prop-types';

import { InputTextarea } from 'primereact/inputtextarea';

import { ThermometerIcon, ArmIcon, WeightIcon, PulseIcon, BreathIcon, HeightIcon } from '@/components/Icons';
import * as examService from '@/services/examService';
import classNames from 'classnames/bind';
import styles from './TabDetail.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
const emptyExam = {
    temperature: 0,
    sysBloodPressure: 0, // <120
    diasBloodPressure: 0,// <80
    breathing: 0,
    pulse: 0,
    height: 0,
    weight: 0,
    note: 0,
}

function ExamTab({specFormId}) {
    const [exam, setExam] = useState(emptyExam)

    useEffect(()=>{
        examService.getExamBySpecFormId(specFormId)
            .then((exam) => {
                let _exam = {...exam};
                // console.log(exam._id);
                setExam(_exam);
            })
    },[])
    
    const handleChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _exam = {...exam};
        _exam[`${name}`] = val;
        setExam(_exam);
    }

    return (
        <div className={cx('grid', 'wide')}>
            <div className={cx('row','no-gutters')}>
                <div className={(cx('col', 'l-4', 'm-4' ,'c-6'))}>
                    <div className={cx('item-container')}>
                        <span className={cx('item-icon')}>
                            <ThermometerIcon/>
                        </span>

                        <div className={cx('item-text')}>
                            <p>Temperature</p>
                            <div className={cx('item-input')}>
                                <input value={exam.temperature} onChange={(e) => handleChange(e,'temperature')}/>
                                <span>&#8451;</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(cx('col', 'l-4', 'm-4' ,'c-6'))}>
                    <div className={cx('item-container')}>
                        <span className={cx('item-icon')}>
                            <ArmIcon/>
                        </span>

                        <div className={cx('item-text')}>
                            <p>Blood pressure</p>
                            <div className={cx('item-input')}>
                                <input value={exam.sysBloodPressure} onChange={(e) => handleChange(e,'sysBloodPressure')}/>
                                <span>/</span>
                                <input value={exam.diasBloodPressure} onChange={(e) => handleChange(e,'diasBloodPressure')}/>
                                <span>mmHg</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(cx('col', 'l-4', 'm-4' ,'c-6'))}>
                    <div className={cx('item-container')}>
                        <span className={cx('item-icon')}>
                            <BreathIcon/>
                        </span>

                        <div className={cx('item-text')}>
                            <p>Breathing</p>
                            <div className={cx('item-input')}>
                                <input value={exam.breathing} onChange={(e) => handleChange(e,'breathing')}/>
                                <span>beats/minute</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(cx('col', 'l-4', 'm-4' ,'c-6'))}>
                    <div className={cx('item-container')}>
                        <span className={cx('item-icon')}>
                            <PulseIcon/>
                        </span>

                        <div className={cx('item-text')}>
                            <p>Pulse</p>
                            <div className={cx('item-input')}>
                                <input value={exam.pulse} onChange={(e) => handleChange(e,'pulse')}/>
                                <span>beats/minute</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(cx('col', 'l-4', 'm-4' ,'c-6'))}>
                    <div className={cx('item-container')}>
                        <span className={cx('item-icon')}>
                            <HeightIcon/>
                        </span>

                        <div className={cx('item-text')}>
                            <p>Height</p>
                            <div className={cx('item-input')}>
                                <input value={exam.height} onChange={(e) => handleChange(e,'height')}/>
                                <span>cm</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(cx('col', 'l-4', 'm-4' ,'c-6'))}>
                    <div className={cx('item-container')}>
                        <span className={cx('item-icon')}>
                            <WeightIcon/>
                        </span>

                        <div className={cx('item-text')}>
                            <p>Weight</p>
                            <div className={cx('item-input')}>
                                <input value={exam.weight} onChange={(e) => handleChange(e,'weight')}/>
                                <span>kg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('input-group')}>
                    <label className={cx('title-input')} htmlFor="note">Note</label>
                    <InputTextarea
                        className={cx('input-text-area')}
                        id="note"
                        value={exam.note}
                        onChange={(e) => handleChange(e, 'note')}
                        required
                        rows={3}
                        cols={20}
                    />
                </div>
            </div>
        </div>
    );
}

ExamTab.prototype={
    specFormId: PropTypes.string,
}

export default ExamTab;