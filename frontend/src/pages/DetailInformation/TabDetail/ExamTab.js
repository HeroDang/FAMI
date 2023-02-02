// import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
/* A library that allows you to validate the props you pass to your React components. */
// import PropTypes from 'prop-types';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputTextarea } from 'primereact/inputtextarea';

import { ThermometerIcon, ArmIcon, WeightIcon, PulseIcon, BreathIcon, HeightIcon } from '@/components/Icons';
import classNames from 'classnames/bind';
import styles from './TabDetail.module.scss';

const cx = classNames.bind(styles);

function ExamTab() {
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
                            <p>30 <span>&#8451;</span></p>
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
                            <p>30 <span>/{` ... `}mmHg</span></p>
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
                            <p>30 <span>beats/minute</span></p>
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
                            <p>30 <span>beats/minute</span></p>
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
                            <p>160 <span>cm</span></p>
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
                            <p>30 <span>kg</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('input-group')}>
                    <label className={cx('title-input')} htmlFor="overResult">Note</label>
                    <InputTextarea
                        className={cx('input-text-area')}
                        id="overResult"
                        // value={}
                        // onChange={(e) => onInputChange(e, 'overResult')}
                        required
                        rows={3}
                        cols={20}
                    />
                </div>
            </div>
        </div>
    );
}

export default ExamTab;